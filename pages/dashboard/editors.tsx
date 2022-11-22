import { AiOutlineClose, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  chakra,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

import { BsCheck } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import Layout from "@/layouts/Dashboard";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const ManageEditors = () => {
  const supabaseClient = useSupabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const toast = useToast();
  const profileDetailsModal = useDisclosure();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [profileDetails, setProfileDetails] = useState(null);

  const fetchUnApprovedProfiles = async () => {
    setLoading(true);
    const r = await fetch("/api/manage-editors/unApproved-editors");
    r.json()
      .then((d) => setData(d))
      .catch((e) => console.log("[fetchUnApprovedProfiles - err] ", e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUnApprovedProfiles();
  }, []);

  const showProfileDetails = async (id: string) => {
    setIsFetching(true);
    try {
      const { error, data } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        toast({
          title: "حدث خطأ",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      setProfileDetails(data);
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsFetching(false);
    }
  };

  const approveProfile = async (id: string) => {
    const r = await fetch(`/api/manage-editors/approve-editors?id=${id}`);
    await r
      .json()
      .then((d) => {
        toast({
          title: "عملية ناجحة",
          description: d.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        toast({
          title: "حدث خطأ",
          description: e.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    await fetchUnApprovedProfiles();
  };

  const deleteProfile = async (id: string) => {
    const r = await fetch(`/api/manage-editors/delete-editors?id=${id}`);
    await r
      .json()
      .then((d) => {
        toast({
          title: "عملية ناجحة",
          description: d.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((e) => {
        toast({
          title: "حدث خطأ",
          description: e.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    await fetchUnApprovedProfiles();
  };

  const openModalAndFetchProfileDetails = (id: string) => {
    profileDetailsModal.onOpen();
    showProfileDetails(id);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box px={8}>
      <Heading>محررين قيد الإنتظار</Heading>
      <TableContainer bg="white" mt={16}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>البريد الإلكتروني</Th>
              <Th>تاريخ الانظمام</Th>
              <Th>عمليات (Actions)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d, i) => (
              <Tr key={i}>
                <Td>{d.id}</Td>
                <Td>{d.email}</Td>
                <Td>{new Date(d.created_at).toLocaleDateString()}</Td>
                <Td>
                  <Stack direction="row">
                    <IconButton
                      onClick={() => openModalAndFetchProfileDetails(d.id)}
                      aria-label="profile details"
                      icon={<AiOutlineEye />}
                    />
                    <IconButton
                      onClick={() => approveProfile(d.id)}
                      aria-label="Accept user"
                      icon={<BsCheck />}
                    />
                    <IconButton
                      onClick={() => deleteProfile(d.id)}
                      aria-label="delete user"
                      icon={<AiOutlineDelete />}
                    />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={profileDetailsModal.isOpen}
        onClose={profileDetailsModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>معلومات المحرر</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!profileDetails && (
              <Flex align="center" justify="center">
                <Spinner />
              </Flex>
            )}
            {profileDetails && (
              <List pb={12} spacing={3}>
                <ListItem pb={4} display={"flex"} alignItems="center">
                  <Avatar
                    size={{ base: "xl", md: "2xl" }}
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profileDetails.avatar_url}`}
                    name={`${profileDetails.first_name} ${profileDetails.last_name}`}
                  />
                </ListItem>
                <ListItem display={"flex"} alignItems="center">
                  <ListIcon as={IoIosArrowBack} color="gray.500" />
                  <p>
                    <chakra.b me={2}>اسم المحرر: </chakra.b>
                    <span>{`${profileDetails.first_name} ${profileDetails.last_name}`}</span>
                  </p>
                </ListItem>
                <ListItem display={"flex"} alignItems="center">
                  <ListIcon as={IoIosArrowBack} color="gray.500" />
                  <p>
                    <chakra.b me={2}>الاسم المستعار: </chakra.b>
                    <span>{profileDetails.username}</span>
                  </p>
                </ListItem>
                <ListItem display={"flex"} alignItems="center">
                  <ListIcon as={IoIosArrowBack} color="gray.500" />
                  <p>
                    <chakra.b me={2}>المجال: </chakra.b>
                    <span>{profileDetails.field}</span>
                  </p>
                </ListItem>
                <ListItem display={"flex"} alignItems="center">
                  <ListIcon as={IoIosArrowBack} color="gray.500" />
                  <p>
                    <chakra.b me={2}>التخصص: </chakra.b>
                    <span>{profileDetails.speciality}</span>
                  </p>
                </ListItem>
                <ListItem display={"flex"} alignItems="center">
                  <ListIcon as={IoIosArrowBack} color="gray.500" />
                  <p>
                    <chakra.b me={2}>نبذة عن المحرر: </chakra.b>
                    <span>{profileDetails.about}</span>
                  </p>
                </ListItem>
                {profileDetails.facebook_account && (
                  <ListItem display={"flex"} alignItems="center">
                    <ListIcon as={IoIosArrowBack} color="gray.500" />
                    <p>
                      <chakra.b me={2}>رابط حساب الفيس بوك: </chakra.b>
                      <span>{profileDetails.facebook_account}</span>
                    </p>
                  </ListItem>
                )}
                {profileDetails.linkedin_account && (
                  <ListItem display={"flex"} alignItems="center">
                    <ListIcon as={IoIosArrowBack} color="gray.500" />
                    <p>
                      <chakra.b me={2}>رابط حساب لينكدإن : </chakra.b>
                      <span>{profileDetails.linkedin_account}</span>
                    </p>
                  </ListItem>
                )}
                {profileDetails.instagram_account && (
                  <ListItem display={"flex"} alignItems="center">
                    <ListIcon as={IoIosArrowBack} color="gray.500" />
                    <p>
                      <chakra.b me={2}>رابط حساب انستغرام : </chakra.b>
                      <span>{profileDetails.instagram_account}</span>
                    </p>
                  </ListItem>
                )}
                {profileDetails.twitter_account && (
                  <ListItem display={"flex"} alignItems="center">
                    <ListIcon as={IoIosArrowBack} color="gray.500" />
                    <p>
                      <chakra.b me={2}>رابط حساب تويتر : </chakra.b>
                      <span>{profileDetails.twitter_account}</span>
                    </p>
                  </ListItem>
                )}
              </List>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

ManageEditors.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ManageEditors;
