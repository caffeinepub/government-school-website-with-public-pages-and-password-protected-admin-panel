import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContentBlock, StaffMember, Notice, GalleryItem, ContactFormSubmission } from '../backend';

// Content Blocks
export function useGetAllContentBlocks() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, ContentBlock]>>({
    queryKey: ['allContentBlocks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContentBlocks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateContentBlock() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, title, content }: { key: string; title: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateContentBlock(key, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allContentBlocks'] });
      queryClient.invalidateQueries({ queryKey: ['contentBlock'] });
    },
  });
}

export function useDeleteContentBlock() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (key: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteContentBlock(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allContentBlocks'] });
      queryClient.invalidateQueries({ queryKey: ['contentBlock'] });
    },
  });
}

// Staff
export function useGetStaffList() {
  const { actor, isFetching } = useActor();

  return useQuery<StaffMember[]>({
    queryKey: ['staffList'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStaffList();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddStaffMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      position,
      biography,
      photoUrl,
    }: {
      name: string;
      position: string;
      biography: string;
      photoUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addStaffMember(name, position, biography, photoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffList'] });
    },
  });
}

export function useUpdateStaffMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      position,
      biography,
      photoUrl,
    }: {
      id: bigint;
      name: string;
      position: string;
      biography: string;
      photoUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateStaffMember(id, name, position, biography, photoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffList'] });
    },
  });
}

export function useDeleteStaffMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteStaffMember(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffList'] });
    },
  });
}

// Notices
export function useGetNotices() {
  const { actor, isFetching } = useActor();

  return useQuery<Notice[]>({
    queryKey: ['notices'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddNotice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, body, date }: { title: string; body: string; date: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addNotice(title, body, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
    },
  });
}

export function useUpdateNotice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, body, date }: { id: bigint; title: string; body: string; date: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateNotice(id, title, body, date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      queryClient.invalidateQueries({ queryKey: ['notice'] });
    },
  });
}

export function useDeleteNotice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteNotice(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
    },
  });
}

// Gallery
export function useGetGalleryItems() {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryItem[]>({
    queryKey: ['galleryItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGalleryItem(title, description, imageUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
    },
  });
}

export function useUpdateGalleryItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      imageUrl,
    }: {
      id: bigint;
      title: string;
      description: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGalleryItem(id, title, description, imageUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
    },
  });
}

export function useDeleteGalleryItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteGalleryItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
    },
  });
}

// Contact Submissions
export function useGetAllContactSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactFormSubmission[]>({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteContactSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteContactSubmission(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}
