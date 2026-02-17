"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import {
  DonationPost,
  formatCurrency,
  getProgressPercentage,
  getCategoryInfo,
} from "@/lib/mock-data";
import { useRef, useEffect, useState } from "react";

interface Props {
  post: DonationPost;
  index: number;
}

export const DonationCard = ({ post, index }: Props) => {
  const progress = getProgressPercentage(post.raisedAmount, post.goalAmount);
  const category = getCategoryInfo(post.category);
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

        const avgBrightness = total / (size * size);
        setIconLight(avgBrightness < 128);
      } catch {
        
      }
    };

    if (img.complete) {
      analyze();
    } else {
      img.addEventListener("load", analyze);
      return () => img.removeEventListener("load", analyze);
    }
  }, [post.imageUrl]);

  return (
    <Link
      href={`/post/${post.id}`}
      className="group block rounded-xl border bg-card overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          ref={imgRef}
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />

        {/* Category icon */}
        <div className="absolute top-3 left-3">
          <category.Icon
            className={`h-5 w-5 drop-shadow-md ${
              iconLight ? "text-white" : "text-gray-900"
            }`}
          />
        </div>

        {post.isCompleted && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-success-foreground">
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">Completado</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </p>

        {/* Author */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {post.authorName.charAt(0)}
          </div>
          <span className="text-xs text-muted-foreground">
            {post.authorName}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-primary">
              {formatCurrency(post.raisedAmount)}
            </span>
            <span className="text-muted-foreground">
              de {formatCurrency(post.goalAmount)}
            </span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
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

          <p className="mt-1 text-right text-xs text-muted-foreground">
            {progress}% recaudado
          </p>
        </div>
      </div>
    </Link>
  );
};
