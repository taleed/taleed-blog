import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import {
  Avatar,
  Box,
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
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
  useDisclosure,
  useToast,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

import { BsCheck } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import Layout from "@/layouts/Dashboard";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "@/utils/supabaseClient";
import { getPagination, ITEMS_IN_PAGE } from "@/utils/paginationConfig";
import Loading from "@/components/dashboard/Loading";
import PaginationBar from "@/components/PaginationBar";

const ManageEditors = () => {
  const supabaseClient = useSupabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const toast = useToast();
  const profileDetailsModal = useDisclosure();
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [profileTypes, setProfileTypes] = useState<any[]>();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);

  //   Colors
  const tableBg = useColorModeValue("white", "whiteAlpha.50");
  const modalBg = useColorModeValue("white", "brand.black");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const inputBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const focusBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  const fetchProfiles = async (filter?: string) => {
    setLoading(true);
    let url = "";
    const { from, to } = getPagination(currentPage, ITEMS_IN_PAGE);

    if (filter) {
      url = `/api/manage-editors?q=${filter}&from=${from}&to=${to}`;
    } else {
      url = `/api/manage-editors?from=${from}&to=${to}`;
    }

    const res = await fetch(url);

    res
      .json()
      .then((d) => {
        setData(d.data);
        setCount(d.count);
      })
      .catch((e) => console.log("[fetchUnApprovedProfiles - err] ", e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    new Promise(async () => {
      await getProfileTypes();
      await fetchProfiles(filter);
    });
  }, [filter, currentPage]);

  const getProfileTypes = async () => {
    setLoading(true);
    const { data } = await supabase.from("profiles_type").select("*");
    setProfileTypes(data ?? []);
    setLoading(false);
  };

  const handleSelectType = async (type: string, id: string) => {
    await supabase.from("profiles").update({ type: type }).eq("id", id);
  };

  const showProfileDetails = async (id: string) => {
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
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
    await fetchProfiles();
  };

  const deleteProfile = async (id: string) => {
    const r = await fetch(`/api/manage-editors/delete-editors?id=${id}`);
    await r
      .json()
      .then((d) => {
        toast({
          title: "عملية ناجحة",
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
    await fetchProfiles();
  };

  const openModalAndFetchProfileDetails = (id: string) => {
    profileDetailsModal.onOpen();
    showProfileDetails(id);
  };
  console.log(data);

  return (
    <Box px={8}>
      <Heading>محررين ({count}) </Heading>

      <Box mt={16} width={"30%"}>
        <chakra.b>انتقي المحررين</chakra.b>
        <Select
          bg={inputBg}
          border={0}
          _focus={{ outline: "none", boxShadow: "none", bg: focusBg }}
          onChange={async (event) => {
            setCurrentPage(0);
            setFilter(event.target.value);
          }}
          size='lg'
          mt={4}
          defaultValue={"all"}>
          <option key={0} value='all'>
            الكل
          </option>
          <option key={1} value='true'>
            تم قبولهم
          </option>
          <option key={2} value='false'>
            قيد الانتظار
          </option>
        </Select>
      </Box>

      {!loading ? (
        <>
          <TableContainer mt={6}>
            <Table bg={tableBg} variant='simple'>
              <Thead>
                <Tr>
                  <Th borderColor={borderColor}>ID</Th>
                  <Th borderColor={borderColor}>الإسم الكامل</Th>
                  <Th borderColor={borderColor}>النوع</Th>
                  <Th borderColor={borderColor}>تاريخ الإنضمام</Th>
                  <Th borderColor={borderColor}>عمليات (Actions)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((d: any, i) => (
                  <Tr key={d.email}>
                    <Td borderColor={borderColor}>{i + 1}</Td>
                    <Td borderColor={borderColor}>{d.full_name}</Td>
                    <Td borderColor={borderColor}>
                      <Select
                        border={0}
                        _focus={{ outline: "none", boxShadow: "none" }}
                        onChange={async (event) => await handleSelectType(event.target.value, d.id)}
                        size='lg'
                        defaultValue={d.type ? d.type : ""}>
                        <option key='nothing' value=''>
                          محرر عادي
                        </option>
                        {profileTypes?.map((pt, i) => (
                          <option key={i} value={pt.type}>
                            {pt.type}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td borderColor={borderColor}>{new Date(d.created_at).toLocaleDateString()}</Td>
                    <Td borderColor={borderColor}>
                      <Stack direction='row'>
                        <IconButton
                          onClick={() => openModalAndFetchProfileDetails(d.id)}
                          aria-label='profile details'
                          icon={<AiOutlineEye />}
                        />
                        {!d.approved && (
                          <IconButton
                            onClick={() => approveProfile(d.id)}
                            aria-label='Accept user'
                            icon={<BsCheck />}
                          />
                        )}
                        <IconButton
                          onClick={() => deleteProfile(d.id)}
                          aria-label='delete user'
                          icon={<AiOutlineDelete />}
                        />
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <PaginationBar
            max={count}
            itemsPerPage={ITEMS_IN_PAGE}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <Loading />
      )}

      <Modal isOpen={profileDetailsModal.isOpen} onClose={profileDetailsModal.onClose}>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>معلومات المحرر</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!profileDetails && (
              <Flex align='center' justify='center'>
                <Spinner />
              </Flex>
            )}
            {profileDetails && (
              <List pb={12} spacing={3}>
                <ListItem pb={4} display={"flex"} alignItems='center'>
                  <Avatar
                    size={{ base: "xl", md: "2xl" }}
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${profileDetails.avatar_url}`}
                    name={`${profileDetails.first_name} ${profileDetails.last_name}`}
                  />
                </ListItem>
                <ListItem display={"flex"} alignItems='center'>
                  <ListIcon as={IoIosArrowBack} color='gray.500' />
                  <p>
                    <chakra.b me={2}>اسم المحرر: </chakra.b>
                    <span>{`${profileDetails.first_name} ${profileDetails.last_name}`}</span>
                  </p>
                </ListItem>
                <ListItem display={"flex"} alignItems='center'>
                  <ListIcon as={IoIosArrowBack} color='gray.500' />
                  <p>
                    <chakra.b me={2}>الاسم المستعار: </chakra.b>
                    <span>{profileDetails.username}</span>
                  </p>
                </ListItem>
                <ListItem display={"flex"} alignItems='center'>
                  <ListIcon as={IoIosArrowBack} color='gray.500' />
                  <p>
                    <chakra.b me={2}>المجال: </chakra.b>
                    <span>{profileDetails.field}</span>
                  </p>
                </ListItem>
                <ListItem display={"flex"} alignItems='center'>
                  <ListIcon as={IoIosArrowBack} color='gray.500' />
                  <p>
                    <chakra.b me={2}>التخصص: </chakra.b>
                    <span>{profileDetails.speciality}</span>
                  </p>
                </ListItem>
                <ListItem display={"flex"} alignItems='center'>
                  <ListIcon as={IoIosArrowBack} color='gray.500' />
                  <p>
                    <chakra.b me={2}>نبذة عن المحرر: </chakra.b>
                    <span>{profileDetails.about}</span>
                  </p>
                </ListItem>
                {profileDetails.facebook_account && (
                  <ListItem display={"flex"} alignItems='center'>
                    <ListIcon as={IoIosArrowBack} color='gray.500' />
                    <p>
                      <chakra.b me={2}>رابط حساب الفيس بوك: </chakra.b>
                      <span>{profileDetails.facebook_account}</span>
                    </p>
                  </ListItem>
                )}
                {profileDetails.linkedin_account && (
                  <ListItem display={"flex"} alignItems='center'>
                    <ListIcon as={IoIosArrowBack} color='gray.500' />
                    <p>
                      <chakra.b me={2}>رابط حساب لينكدإن : </chakra.b>
                      <span>{profileDetails.linkedin_account}</span>
                    </p>
                  </ListItem>
                )}
                {profileDetails.instagram_account && (
                  <ListItem display={"flex"} alignItems='center'>
                    <ListIcon as={IoIosArrowBack} color='gray.500' />
                    <p>
                      <chakra.b me={2}>رابط حساب انستغرام : </chakra.b>
                      <span>{profileDetails.instagram_account}</span>
                    </p>
                  </ListItem>
                )}
                {profileDetails.twitter_account && (
                  <ListItem display={"flex"} alignItems='center'>
                    <ListIcon as={IoIosArrowBack} color='gray.500' />
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
