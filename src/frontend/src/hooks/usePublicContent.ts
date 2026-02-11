import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContentBlock, StaffMember, Notice, GalleryItem } from '../backend';

export function useGetContentBlock(key: string) {
  const { actor, isFetching } = useActor();

  return useQuery<ContentBlock | null>({
    queryKey: ['contentBlock', key],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getContentBlock(key);
    },
    enabled: !!actor && !isFetching,
  });
}

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

export function useGetNoticeById(id: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Notice | null>({
    queryKey: ['notice', id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getNoticeById(id);
    },
    enabled: !!actor && !isFetching,
  });
}

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

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(name, email, message);
    },
  });
}
