'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  CreateTrackFormData,
  CreateTrackFormSchema,
} from '@/modules/admin/domain/track.validation';
import { Genres } from '@/modules/genres/domain/genres';
import { Mood } from '@/modules/mood/domain/mood';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrackState } from '@prisma/client';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SMAPLE_IMAGE =
  'https://images.unsplash.com/photo-1695852147874-86809c9d549a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';

interface Props {
  genres: Genres[];
  moods: Mood[];
}

export const AddTrackForm = ({ genres, moods }: Props) => {
  const form = useForm<CreateTrackFormData>({
    resolver: zodResolver(CreateTrackFormSchema),
    defaultValues: {
      title: '',
      imageUrl: SMAPLE_IMAGE,
      length: 200,
      bpm: 90,
      isPublish: TrackState.HIDDEN,
    },
  });
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);

  const onSubmit = (data: CreateTrackFormData) => {
    console.log(data);
    console.log(selectedGenres);
    console.log(selectedMoods);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full grid xl:grid-cols-3 gap-6"
      >
        <div className="grid gap-6 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>title</FormLabel>
                      <FormControl>
                        <Input placeholder="title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>length</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="bpm"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>bpm</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="grid gap-2">
                  <Label htmlFor="key">Key</Label>
                  <Input id="key" placeholder="Bm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid xl:grid-cols-2 gap-6">
            <div>
              {/* 사운드 트랙 */}
              <Card className="">
                <CardHeader>
                  <CardTitle>사운드 트랙</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="file">File</Label>
                    <Input type="file" id="file" accept="audio/mp3" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fileName">FileName</Label>
                    <Input id="fileName" placeholder="filename" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-end">
                    <div className="grid gap-2">
                      <Label htmlFor="stemType">Type</Label>
                      <Select defaultValue="full">
                        <SelectTrigger id="stemType">
                          <SelectValue placeholder="full" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="flex gap-2" disabled>
                      <Play className="w-4" />
                      미리듣기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              {/* Cover Image 업로드 */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>커버 이미지</CardTitle>
                  <CardDescription>
                    이미지 파일은 1:1 비율이 권장됩니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="file">File</Label>
                    <Input type="file" id="file" accept="audio/mp3" />
                  </div>

                  <div className="relative w-full max-w-[320px] mx-auto aspect-square border rounded-md">
                    <Image
                      src={SMAPLE_IMAGE}
                      alt="coverImage"
                      fill
                      objectFit="cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div>
          <div className="col-span-1 grid gap-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>공개 여부</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="isPublish"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Publish</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={TrackState.PUBLISH}
                                  id="r1"
                                />
                                <Label htmlFor="r1">Published</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={TrackState.HIDDEN}
                                  id="r2"
                                />
                                <Label htmlFor="r2">Hidden</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>장르</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-1 flex-wrap">
                  {genres.map((item) => (
                    <Badge
                      key={item.tag}
                      variant={
                        selectedGenres.includes(item.id) ? 'default' : 'outline'
                      }
                      className={cn('cursor-pointer')}
                      onClick={() => {
                        setSelectedGenres((prev) => {
                          if (prev.includes(item.id)) {
                            return prev.filter((id) => id !== item.id);
                          } else {
                            return [...prev, item.id];
                          }
                        });
                      }}
                    >
                      {item.tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>분위기</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-1 flex-wrap">
                {moods.map((item) => (
                  <Badge
                    key={item.tag}
                    variant={
                      selectedMoods.includes(item.id) ? 'default' : 'outline'
                    }
                    className={cn('cursor-pointer')}
                    onClick={() => {
                      setSelectedMoods((prev) => {
                        if (prev.includes(item.id)) {
                          return prev.filter((id) => id !== item.id);
                        } else {
                          return [...prev, item.id];
                        }
                      });
                    }}
                  >
                    {item.tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
            <Button type="submit">생성</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
