"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CourseCard = ({
  title,
  createdAt,
  thumbnail,
  description,
  slug,
}: {
  title: string;
  createdAt: string;
  thumbnail: string;
  description: string;
  slug: string;
}) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/details/${slug}`)}
      className="cursor-pointer"
    >
      <CardContent className="p-0 shadow-lg">
        <div className="relative w-full h-[30vh]">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="w-full h-full rounded-t-md object-cover"
          />
        </div>
        <div className="px-4 py-4">
          <p className="text-muted-foreground text-sm">{createdAt}</p>
          <h1 className="font-bold font-serif text-xl line-clamp-1">{title}</h1>
          <div
            className="line-clamp-3 text-muted-foreground text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
