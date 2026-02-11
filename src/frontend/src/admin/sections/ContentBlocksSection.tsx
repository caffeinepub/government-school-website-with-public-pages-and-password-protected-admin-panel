import { useState } from 'react';
import { useGetAllContentBlocks, useUpdateContentBlock, useDeleteContentBlock } from '../../hooks/useAdminContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Trash2, Plus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function ContentBlocksSection() {
  const { data: contentBlocks, isLoading } = useGetAllContentBlocks();
  const updateMutation = useUpdateContentBlock();
  const deleteMutation = useDeleteContentBlock();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [keyToDelete, setKeyToDelete] = useState('');

  const handleEdit = (key: string, title: string, content: string) => {
    setCurrentKey(key);
    setCurrentTitle(title);
    setCurrentContent(content);
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!currentKey.trim() || !currentTitle.trim()) return;

    try {
      await updateMutation.mutateAsync({
        key: currentKey,
        title: currentTitle,
        content: currentContent,
      });
      setEditDialogOpen(false);
      setCurrentKey('');
      setCurrentTitle('');
      setCurrentContent('');
    } catch (error) {
      console.error('Failed to save content block:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(keyToDelete);
      setDeleteDialogOpen(false);
      setKeyToDelete('');
    } catch (error) {
      console.error('Failed to delete content block:', error);
    }
  };

  const openDeleteDialog = (key: string) => {
    setKeyToDelete(key);
    setDeleteDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Content Blocks</CardTitle>
            <CardDescription>Manage text content for various pages</CardDescription>
          </div>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setCurrentKey(''); setCurrentTitle(''); setCurrentContent(''); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Content Block
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{currentKey ? 'Edit Content Block' : 'Add Content Block'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="key">Key (e.g., home-welcome, about-history)</Label>
                  <Input
                    id="key"
                    value={currentKey}
                    onChange={(e) => setCurrentKey(e.target.value)}
                    placeholder="unique-key-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    placeholder="Content title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                    placeholder="Content text"
                    rows={8}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : contentBlocks && contentBlocks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentBlocks.map(([key, block]) => (
                <TableRow key={key}>
                  <TableCell className="font-mono text-sm">{key}</TableCell>
                  <TableCell className="font-medium">{block.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {block.content.substring(0, 60)}
                    {block.content.length > 60 ? '...' : ''}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(key, block.title, block.content)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(key)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No content blocks yet. Click "Add Content Block" to create one.
          </p>
        )}
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Content Block</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this content block? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
