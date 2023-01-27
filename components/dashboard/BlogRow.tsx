import { useRouter } from "next/router";
import { BsPauseCircle } from "react-icons/bs";
import { FaEdit, FaShare, FaTrash } from "react-icons/fa";
import { useState, Dispatch, SetStateAction } from "react";
import {
  IconButton,
  Spinner,
  Stack,
  Td,
  Tooltip,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

interface BlogRowProsp {
  setData: Dispatch<SetStateAction<any[] | undefined>>;
  d: any;
}

const BlogRow: React.FC<BlogRowProsp> = ({ d, setData }) => {
  const [statusLoading, setStatusLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handlePublish = async (id: number) => {
    try {
      setStatusLoading(true);
      const result = await fetch("/api/manage-blogs/" + id, {
        method: "PATCH",
        body: JSON.stringify({ statu: "published" }),
      }).then((res) => res.json());

      if (!result.post) return;

      setData((prev: any) =>
        prev?.map((post: any) => (post.id === id ? { ...post, status: "published" } : post))
      );

      toast({
        title: "تم نشر المقالة",
        description: "تم نشر المقالة بنجاح, يُمكن للجميع رؤيتها الآن.",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });
    } catch (e: any) {
      console.log("[error - share post]: ", e.message);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleDraft = async (id: number) => {
    try {
      setStatusLoading(true);
      const result = await fetch("/api/manage-blogs/" + id, {
        method: "PATCH",
        body: JSON.stringify({ statu: "draft" }),
      }).then((res) => res.json());

      if (!result.post) return;

      setData((prev: any) =>
        prev?.map((post: any) => (post.id === id ? { ...post, status: "draft" } : post))
      );

      toast({
        title: "تم تعليق المقالة",
        description: "تم تعليق المقالة بنجاح.",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });
    } catch (e: any) {
      console.log("[error - share post]: ", e.message);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await fetch("/api/manage-blogs/" + id, {
        method: "DELETE",
      }).then((res) => res.json());

      if (!result.deleted) return;

      setData((prev: any) => prev?.filter((post: any) => post.id !== id));

      toast({
        title: "تم حذف المقالة",
        description: "تم حذف المقالة بنجاح.",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });
    } catch (e: any) {
      console.log("[error - delete post]: ", e.message);
    }
  };
  return (
    <Tr>
      <Td borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}>{d.title}</Td>
      <Td borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}>
        {d.user_id.first_name} {d.user_id.last_name}
      </Td>
      <Td borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}>{d.likes}</Td>
      <Td borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}>{d.views}</Td>
      <Td borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}>{d.category_id.name}</Td>
      <Td borderColor={useColorModeValue("gray.200", "whiteAlpha.100")}>
        <Stack direction='row'>
          {d.status !== "published" ? (
            <Tooltip hasArrow label='نشر' fontSize='sm'>
              <IconButton
                onClick={async () => await handlePublish(d.id)}
                aria-label='accept and share blog post'
                icon={statusLoading ? <Spinner /> : <FaShare />}
                disabled={statusLoading}
              />
            </Tooltip>
          ) : (
            <Tooltip hasArrow label='تعليق' fontSize='sm'>
              <IconButton
                onClick={async () => await handleDraft(d.id)}
                aria-label='draft blog post'
                icon={statusLoading ? <Spinner /> : <BsPauseCircle />}
                disabled={statusLoading}
              />
            </Tooltip>
          )}

          <Tooltip hasArrow label='تعديل' fontSize='sm'>
            <IconButton
              onClick={() =>
                router.push(
                  {
                    pathname: "/dashboard/edit-blog",
                    query: { ...d, category_id: d.category_id.id, user_id: d.user_id.id },
                  },
                  "/dashboard/edit-blog"
                )
              }
              aria-label='edit blog post'
              icon={<FaEdit />}
            />
          </Tooltip>
          <Tooltip hasArrow label='حذف' fontSize='sm'>
            <IconButton
              onClick={async () => await handleDelete(d.id)}
              aria-label='delete blog post'
              icon={<FaTrash />}
            />
          </Tooltip>
        </Stack>
      </Td>
    </Tr>
  );
};

export default BlogRow;
