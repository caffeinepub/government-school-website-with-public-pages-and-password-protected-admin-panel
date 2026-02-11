import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  type ContentBlock = {
    title : Text;
    content : Text;
  };

  type StaffMember = {
    id : Nat;
    name : Text;
    position : Text;
    biography : Text;
    photoUrl : Text;
  };

  type Notice = {
    id : Nat;
    title : Text;
    body : Text;
    date : Int;
  };

  type GalleryItem = {
    id : Nat;
    title : Text;
    description : Text;
    imageUrl : Text;
    dateAdded : Int;
  };

  type ContactFormSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  // State
  var contentBlocksEntries : [(Text, ContentBlock)] = [];
  var staffEntries : [(Nat, StaffMember)] = [];
  var noticesEntries : [(Nat, Notice)] = [];
  var galleryEntries : [(Nat, GalleryItem)] = [];
  var contactSubmissionsEntries : [(Nat, ContactFormSubmission)] = [];
  var userProfilesEntries : [(Principal, UserProfile)] = [];

  var nextStaffId = 0;
  var nextGalleryId = 0;
  var nextNoticeId = 0;
  var nextContactId = 0;

  let contentBlocks = Map.fromIter<Text, ContentBlock>(contentBlocksEntries.vals());
  let staff = Map.fromIter<Nat, StaffMember>(staffEntries.vals());
  let notices = Map.fromIter<Nat, Notice>(noticesEntries.vals());
  let gallery = Map.fromIter<Nat, GalleryItem>(galleryEntries.vals());
  let contactSubmissions = Map.fromIter<Nat, ContactFormSubmission>(contactSubmissionsEntries.vals());
  let userProfiles = Map.fromIter<Principal, UserProfile>(userProfilesEntries.vals());

  system func preupgrade() {
    contentBlocksEntries := contentBlocks.entries().toArray();
    staffEntries := staff.entries().toArray();
    noticesEntries := notices.entries().toArray();
    galleryEntries := gallery.entries().toArray();
    contactSubmissionsEntries := contactSubmissions.entries().toArray();
    userProfilesEntries := userProfiles.entries().toArray();
  };

  system func postupgrade() {
    contentBlocksEntries := [];
    staffEntries := [];
    noticesEntries := [];
    galleryEntries := [];
    contactSubmissionsEntries := [];
    userProfilesEntries := [];
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Content Blocks - Public read, Admin write
  public query ({ caller }) func getContentBlock(key : Text) : async ?ContentBlock {
    // Public access - no auth required
    contentBlocks.get(key);
  };

  public query ({ caller }) func getAllContentBlocks() : async [(Text, ContentBlock)] {
    // Public access - no auth required
    contentBlocks.entries().toArray();
  };

  public shared ({ caller }) func updateContentBlock(key : Text, title : Text, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update content blocks");
    };
    let block : ContentBlock = {
      title;
      content;
    };
    contentBlocks.add(key, block);
  };

  public shared ({ caller }) func deleteContentBlock(key : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete content blocks");
    };
    contentBlocks.remove(key);
  };

  // Staff - Public read, Admin write
  public query ({ caller }) func getStaffList() : async [StaffMember] {
    // Public access - no auth required
    staff.values().toArray();
  };

  public query ({ caller }) func getStaffMember(id : Nat) : async ?StaffMember {
    // Public access - no auth required
    staff.get(id);
  };

  public shared ({ caller }) func addStaffMember(name : Text, position : Text, biography : Text, photoUrl : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add staff members");
    };
    let member : StaffMember = {
      id = nextStaffId;
      name;
      position;
      biography;
      photoUrl;
    };
    staff.add(nextStaffId, member);
    let id = nextStaffId;
    nextStaffId += 1;
    id;
  };

  public shared ({ caller }) func updateStaffMember(id : Nat, name : Text, position : Text, biography : Text, photoUrl : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update staff members");
    };
    let member : StaffMember = {
      id;
      name;
      position;
      biography;
      photoUrl;
    };
    staff.add(id, member);
  };

  public shared ({ caller }) func deleteStaffMember(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete staff members");
    };
    staff.remove(id);
  };

  // Notices - Public read, Admin write
  public query ({ caller }) func getNotices() : async [Notice] {
    // Public access - no auth required
    let noticesArray = notices.values().toArray();
    noticesArray.sort(func(a : Notice, b : Notice) : Order.Order {
      Int.compare(b.date, a.date);
    });
  };

  public query ({ caller }) func getNoticeById(id : Nat) : async ?Notice {
    // Public access - no auth required
    notices.get(id);
  };

  public shared ({ caller }) func addNotice(title : Text, body : Text, date : Int) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add notices");
    };
    let notice : Notice = {
      id = nextNoticeId;
      title;
      body;
      date;
    };
    notices.add(nextNoticeId, notice);
    let id = nextNoticeId;
    nextNoticeId += 1;
    id;
  };

  public shared ({ caller }) func updateNotice(id : Nat, title : Text, body : Text, date : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update notices");
    };
    let notice : Notice = {
      id;
      title;
      body;
      date;
    };
    notices.add(id, notice);
  };

  public shared ({ caller }) func deleteNotice(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete notices");
    };
    notices.remove(id);
  };

  // Gallery - Public read, Admin write
  public query ({ caller }) func getGalleryItems() : async [GalleryItem] {
    // Public access - no auth required
    gallery.values().toArray();
  };

  public query ({ caller }) func getGalleryItem(id : Nat) : async ?GalleryItem {
    // Public access - no auth required
    gallery.get(id);
  };

  public shared ({ caller }) func addGalleryItem(title : Text, description : Text, imageUrl : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };
    let item : GalleryItem = {
      id = nextGalleryId;
      title;
      description;
      imageUrl;
      dateAdded = Time.now();
    };
    gallery.add(nextGalleryId, item);
    let id = nextGalleryId;
    nextGalleryId += 1;
    id;
  };

  public shared ({ caller }) func updateGalleryItem(id : Nat, title : Text, description : Text, imageUrl : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update gallery items");
    };
    switch (gallery.get(id)) {
      case (?existing) {
        let item : GalleryItem = {
          id;
          title;
          description;
          imageUrl;
          dateAdded = existing.dateAdded;
        };
        gallery.add(id, item);
      };
      case null {
        Runtime.trap("Gallery item not found");
      };
    };
  };

  public shared ({ caller }) func deleteGalleryItem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };
    gallery.remove(id);
  };

  // Contact Form - Public submit, Admin read/delete
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    // Public access - no auth required (guests can submit)
    let submission : ContactFormSubmission = {
      id = nextContactId;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(nextContactId, submission);
    nextContactId += 1;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactFormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };

  public shared ({ caller }) func deleteContactSubmission(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete contact submissions");
    };
    contactSubmissions.remove(id);
  };
};
