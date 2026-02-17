"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Heart, ShieldCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  mockPosts,
  formatCurrency,
  getProgressPercentage,
  getCategoryInfo,
} from "@/lib/mock-data";
import CommentsSection from "@/components/post/CommentsSection";
import { useToast } from "@/hooks/use-toast";

const PostDetail = () => {
  const params = useParams();
  const id = params?.id as string;

  const post = mockPosts.find((p) => p.id === id);
  const { toast } = useToast();
  const imgRef = useRef<HTMLImageElement>(null);
  const [iconLight, setIconLight] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const analyze = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 40;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        let total = 0;
        for (let i = 0; i < data.length; i += 4) {
          total +=
            data[i] * 0.299 +
            data[i + 1] * 0.587 +
            data[i + 2] * 0.114;
        }

        setIconLight(total / (size * size) < 128);
      } catch {}
    };

    if (img.complete) analyze();
    else {
      img.addEventListener("load", analyze);
      return () => img.removeEventListener("load", analyze);
    }
  }, [post?.imageUrl]);

  if (!post) {
    return (
      <div className="p-6 flex flex-col items-center justify-center py-24">
        <p className="text-muted-foreground">Publicación no encontrada.</p>

        <Link href="/" className="mt-4">
          <Button variant="outline">Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  const progress = getProgressPercentage(post.raisedAmount, post.goalAmount);
  const category = getCategoryInfo(post.category);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: post.title,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Enlace copiado",
        description: "El enlace ha sido copiado al portapapeles.",
      });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </Link>

      <article className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="relative aspect-video">
          <img
            ref={imgRef}
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />

          <div className="absolute top-3 left-3">
            <category.Icon
              className={`h-5 w-5 drop-shadow-md ${
                iconLight ? "text-white" : "text-gray-900"
              }`}
            />
          </div>

          {post.isCompleted && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-success px-3 py-1 text-success-foreground text-sm font-bold">
              <CheckCircle className="h-4 w-4" />
              Meta alcanzada
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <h1 className="font-heading text-xl font-bold sm:text-2xl">
            {post.title}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-xs">
              {post.authorName.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-medium">{post.authorName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("es-CR")}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          </div>

          {post.proofImages.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold mb-2">Pruebas adjuntas</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {post.proofImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Prueba ${i + 1}`}
                    className="rounded-lg border object-cover aspect-[4/3] w-full"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 rounded-lg bg-muted/50 p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Recaudado</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(post.raisedAmount)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">Meta</p>
                <p className="text-base font-semibold">
                  {formatCurrency(post.goalAmount)}
                </p>
              </div>
            </div>

            <div className="mt-2 h-2.5 rounded-full bg-background overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${progress}%`,
                  background: post.isCompleted
                    ? "hsl(var(--success))"
                    : "hsl(var(--primary))",
                }}
              />
            </div>

            <p className="mt-1.5 text-right text-xs text-muted-foreground">
              {progress}%
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/login">
              <Button size="sm" className="gap-1.5">
                <Heart className="h-4 w-4" />
                Donar
              </Button>
            </Link>

            <Link href="/login">
              <Button size="sm" variant="outline" className="gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Donar con Escrow
              </Button>
            </Link>

            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
          </div>

          <CommentsSection postId={post.id} />
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
