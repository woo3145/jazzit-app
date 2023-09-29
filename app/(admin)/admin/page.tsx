import { createGenres } from '@/modules/admin/application/createGenres/createGenresServerAction';

export default function AdminPage() {
  const onSubmit = async (data: FormData) => {
    'use server';
    try {
      const genres = await createGenres({
        tag: (data.get('tag') as string) ?? '',
        slug: (data.get('slug') as string) ?? '',
      });
      console.log(genres);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-between">
      <div>
        <form action={onSubmit}>
          <input name="tag" />
          <input name="slug" />
          <button>장르 생성</button>
        </form>
      </div>
    </div>
  );
}
