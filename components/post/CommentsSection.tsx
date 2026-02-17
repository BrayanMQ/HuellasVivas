"use client";

import { useState } from "react";
import { MessageCircle, Send, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment, mockComments } from "@/lib/mock-data";

interface Props {
  postId: string;
}

const CommentItem = ({
  comment,
  replies,
  onReply,
}: {
  comment: Comment;
  replies: Comment[];
  onReply: (parentId: string) => void;
}) => (
  <div className="rounded-lg border bg-muted/40 p-3">
    <div className="flex items-center gap-2 mb-1">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        {comment.authorName.charAt(0)}
      </div>
      <span className="text-sm font-semibold">{comment.authorName}</span>
      <span className="text-xs text-muted-foreground ml-auto">
        {new Date(comment.createdAt).toLocaleDateString("es-CL")}
      </span>
    </div>
    <p className="text-sm text-foreground/80 pl-8">{comment.content}</p>
    <button
      onClick={() => onReply(comment.id)}
      className="mt-1 ml-8 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
    >
      <Reply className="h-3 w-3" />
      Responder
    </button>

    {/* Replies */}
    {replies.length > 0 && (
      <div className="mt-2 ml-8 space-y-2 border-l-2 border-border pl-3">
        {replies.map((r) => (
          <div key={r.id} className="rounded-lg bg-muted/30 p-2.5">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                {r.authorName.charAt(0)}
              </div>
              <span className="text-xs font-semibold">{r.authorName}</span>
              <span className="text-[10px] text-muted-foreground ml-auto">
                {new Date(r.createdAt).toLocaleDateString("es-CL")}
              </span>
            </div>
            <p className="text-xs text-foreground/80 pl-7">{r.content}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

const CommentsSection = ({ postId }: Props) => {
  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter((c) => c.postId === postId)
  );
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const topLevelComments = comments.filter((c) => !c.parentId);

  const getReplies = (parentId: string) =>
    comments.filter((c) => c.parentId === parentId);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `c-${Date.now()}`,
      postId,
      authorName: "Usuario Anónimo",
      content: newComment.trim(),
      createdAt: new Date().toISOString().split("T")[0],
      parentId: replyingTo ?? undefined,
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
    setReplyingTo(null);
  };

  const handleReply = (parentId: string) => {
    setReplyingTo(parentId);
  };

  const replyingComment = replyingTo
    ? comments.find((c) => c.id === replyingTo)
    : null;

  return (
    <div className="mt-8">
      <h3 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-primary" />
        Comentarios ({comments.length})
      </h3>

      {/* Comment list */}
      <div className="space-y-3 mb-4">
        {topLevelComments.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Sé el primero en comentar.
          </p>
        ) : (
          topLevelComments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              replies={getReplies(c.id)}
              onReply={handleReply}
            />
          ))
        )}
      </div>

      {/* Reply indicator */}
      {replyingComment && (
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Reply className="h-3 w-3" />
          Respondiendo a <span className="font-semibold">{replyingComment.authorName}</span>
          <button
            onClick={() => setReplyingTo(null)}
            className="ml-auto text-destructive hover:underline"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* New comment */}
      <div className="flex gap-2">
        <Textarea
          placeholder={replyingTo ? "Escribe una respuesta..." : "Escribe un comentario..."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[60px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={!newComment.trim()}
          className="shrink-0 self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CommentsSection;
