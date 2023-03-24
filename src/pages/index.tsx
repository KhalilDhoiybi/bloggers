import { type NextPage } from "next";
import Head from "next/head";
import BlogPost from "~/components/BlogPost";
import CreateBlog from "~/components/CreateBlog";
import EmptyHome from "~/components/home/EmptyHome";
import Spinner from "~/components/Spinner";
import Container from "~/layouts/Container";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const getBlogsQuery = api.blogsRouter.getBlogs.useQuery();

  if (!getBlogsQuery.data) {
    return (
      <div className="fixed top-0 left-0 z-10 flex h-screen w-full items-center justify-center">
        <Spinner size="x2l" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container className="space-y-4 py-6">
        <CreateBlog />
        <hr className="border-slate-300" />
        {!getBlogsQuery.data.blogs.length && <EmptyHome />}
        {!!getBlogsQuery.data.blogs &&
          getBlogsQuery.data.blogs.map((blog) => (
            <BlogPost key={blog.id} blog={blog} user={blog.user} />
          ))}
      </Container>
    </>
  );
};

export default Home;
