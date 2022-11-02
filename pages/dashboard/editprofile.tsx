import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useBoolean,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Layout from "@/layouts/Dashboard";
import { ReactElement } from "react";

interface MyBlogsProps {
  userID: number;
  firstName: string;
  lastName: string;
  username: string;
  field: string;
  speciality: string;
  about: string;
  authorImg: string;
  facebookAccount: string;
  instaAccount: string;
  linkedInAccount?: string;
  twitterAccount?: string;
  email: string;
  password?: string;
}

const USERDATA: MyBlogsProps = {
  userID: 1,
  firstName: "zakaria",
  lastName: "rabbah",
  username: "zakaria112",
  field: "صانع محتوى و مترجم",
  speciality: "شاعر",
  about: "كاتب للعديد من الكتب وفائز في مسابقة افضل كاتب",
  authorImg: "/authorimg.jpg",
  facebookAccount: "",
  instaAccount: "",
  email: "chaking@test.com",
};

const EditProfile = () => {
  // const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [isWantUpdateFirstName, setIswantUpdateFirstName] =
    useState<boolean>(false);
  const [isUpdatingFirstName, setIsUpdatingFirstName] = useBoolean();

  // const [lastName, setLastName] = useState<string>("");
  const [isWantUpdateLastName, setIswantUpdateLastName] =
    useState<boolean>(false);
  const [isUpdatingLastName, setIsUpdatingLastName] = useBoolean();

  // const [username, setUsername] = useState<string | undefined>(undefined);
  const [isWantUpdateUsername, setIswantUpdateUsername] =
    useState<boolean>(false);
  const [isUpdatingUsername, setIsUpdatingUsername] = useBoolean();

  // const [about, setAbout] = useState<string>("");
  const [isWantUpdateAbout, setIswantUpdateAbout] = useState<boolean>(false);
  const [isUpdatingAbout, setIsUpdatingAbout] = useBoolean();

  // const [facebookAccount, setFacebookAccount] = useState<string | undefined>(undefined);
  const [isWantUpdateFacebookAccount, setIswantUpdateFacebookAccount] =
    useState<boolean>(false);
  const [isUpdatingFacebookAccount, setIsUpdatingFacebookAccount] =
    useBoolean();

  // const [instaAccount, setInstaAccount] = useState<string>("");
  const [isWantUpdateInstaAccount, setIswantUpdateInstaAccount] =
    useState<boolean>(false);
  const [isUpdatingInstaAccount, setIsUpdatingInstaAccount] = useBoolean();

  // const [authorImg, setAuthorImg] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);

  // const [email, setEmail] = useState<string>("");
  const [isWantUpdateEmail, setIswantUpdateEmail] = useState<boolean>(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useBoolean();

  const uploadAvatar = async (event: any) => {
    // if (!event.target.files || event.target.files.length === 0) {
    //   throw new Error("عليك اختيار صورة");
    // }

    // setUploading(true);
    // const file = event.target.files[0];
    // const fileExt = file.name.split(".").pop();
    // const filePath = `${user?.email}.${fileExt}`;

    // const { error: uploadError } = await supabase.storage
    //   .from("avatars")
    //   .upload(filePath, file);

    // if (uploadError) {
    //   setUploading(false);
    //   throw uploadError;
    // }

    // updateAvatarUrl(filePath);
    // setAvatarUrl(filePath);
    setUploading(false);
  };

  return (
    <>
      <Flex
        direction={"column"}
        alignItems={"center"}
        py={8}
        px={44}
        color="white"
      >
        <Box mb="6" display="inline-block">
          <Avatar
            rounded="md"
            borderRadius="md"
            size={"2xl"}
            name={USERDATA.firstName}
            src={USERDATA.authorImg}
          />
          <FormControl mt={2}>
            <FormLabel
              htmlFor="avatar"
              w="full"
              bg="green.500"
              rounded="md"
              textAlign="center"
              py={2}
              _hover={{ bg: "green.600", cursor: "pointer" }}
              _focus={{ outline: "none" }}
            >
              {uploading ? "Uploading ..." : "Upload"}
            </FormLabel>
            <Input
              visibility="hidden"
              position="absolute"
              type="file"
              id="avatar"
              accept="image/*"
              onChange={(e) => uploadAvatar(e)}
              disabled={uploading}
            />
          </FormControl>
        </Box>
        <Flex mb={6} w="full">
          <Box ml={6} w="full" color="brand.black">
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="firstname">
              الاسم
            </FormLabel>
            <Flex align={"center"} justify="space-between">
              <Input
                isDisabled={!isWantUpdateFirstName}
                p={4}
                borderRadius={10}
                bg={"blackAlpha.100"}
                border={0}
                _focus={{
                  bg: "blackAlpha.200",
                }}
                _disabled={{
                  bg: "blackAlpha.100",
                }}
                autoComplete="off"
                type="text"
                id="firstname"
                name="firstname"
                size="lg"
                // onChange={(e) => setEmail(e.target.value)}
                value={USERDATA.firstName}
              />
              <Stack direction={"row"} spacing={2}>
                {!isWantUpdateFirstName && (
                  <Button
                    onClick={(e) => setIswantUpdateFirstName(true)}
                    ms={2}
                    borderRadius={10}
                    colorScheme={"blue"}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    تحديث
                  </Button>
                )}
                {isWantUpdateFirstName && (
                  <>
                    <Button
                      // onClick={updateEmail}
                      isLoading={isUpdatingFirstName}
                      ms={2}
                      borderRadius={10}
                      colorScheme={"orange"}
                      _focus={{
                        outline: "none",
                      }}
                      _focusWithin={{
                        outline: "none",
                      }}
                    >
                      حفظ
                    </Button>
                    <Button
                      onClick={(e) => {
                        setIswantUpdateFirstName(false);
                        // setEmail(user?.email!);
                      }}
                      borderRadius={10}
                      bg="white"
                      color="gray.800"
                      _hover={{
                        background: "gray.200",
                      }}
                      _focus={{
                        outline: "none",
                      }}
                      _focusWithin={{
                        outline: "none",
                      }}
                    >
                      الغاء
                    </Button>
                  </>
                )}
              </Stack>
            </Flex>
          </Box>
          <Box w="full" color="brand.black">
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="lastname">
              اللقب
            </FormLabel>
            <Flex align={"center"} justify="space-between">
              <Input
                isDisabled={!isWantUpdateLastName}
                p={4}
                borderRadius={10}
                bg={"blackAlpha.100"}
                border={0}
                _focus={{
                  bg: "blackAlpha.200",
                }}
                _disabled={{
                  bg: "blackAlpha.100",
                }}
                autoComplete="off"
                type="text"
                id="lastname"
                name="lastname"
                size="lg"
                // onChange={(e) => setEmail(e.target.value)}
                value={USERDATA.lastName}
              />
              <Stack direction={"row"} spacing={2}>
                {!isWantUpdateLastName && (
                  <Button
                    onClick={(e) => setIswantUpdateLastName(true)}
                    ms={2}
                    borderRadius={10}
                    colorScheme={"blue"}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    تحديث
                  </Button>
                )}
                {isWantUpdateLastName && (
                  <>
                    <Button
                      // onClick={updateEmail}
                      isLoading={isUpdatingLastName}
                      ms={2}
                      borderRadius={10}
                      colorScheme={"orange"}
                      _focus={{
                        outline: "none",
                      }}
                      _focusWithin={{
                        outline: "none",
                      }}
                    >
                      حفظ
                    </Button>
                    <Button
                      onClick={(e) => {
                        setIswantUpdateLastName(false);
                        // setEmail(user?.email!);
                      }}
                      borderRadius={10}
                      bg="white"
                      color="gray.800"
                      _hover={{
                        background: "gray.200",
                      }}
                      _focus={{
                        outline: "none",
                      }}
                      _focusWithin={{
                        outline: "none",
                      }}
                    >
                      الغاء
                    </Button>
                  </>
                )}
              </Stack>
            </Flex>
          </Box>
        </Flex>
        <Box mb={6} w="full" color="brand.black">
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="username">
            اسم المستخدم
          </FormLabel>
          <Flex align={"center"} justify="space-between">
            <Input
              isDisabled={!isWantUpdateUsername}
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete="off"
              id="username"
              name="username"
              size="lg"
              // onChange={(e) => setEmail(e.target.value)}
              value={USERDATA.username}
            />
            <Stack direction={"row"} spacing={2}>
              {!isWantUpdateUsername && (
                <Button
                  onClick={(e) => setIswantUpdateUsername(true)}
                  ms={2}
                  borderRadius={10}
                  colorScheme={"blue"}
                  _focus={{
                    outline: "none",
                  }}
                  _focusWithin={{
                    outline: "none",
                  }}
                >
                  تحديث
                </Button>
              )}
              {isWantUpdateUsername && (
                <>
                  <Button
                    // onClick={updateEmail}
                    isLoading={isUpdatingUsername}
                    ms={2}
                    borderRadius={10}
                    colorScheme={"orange"}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    حفظ
                  </Button>
                  <Button
                    onClick={(e) => {
                      setIswantUpdateUsername(false);
                      // setEmail(user?.email!);
                    }}
                    borderRadius={10}
                    bg="white"
                    color="gray.800"
                    _hover={{
                      background: "gray.200",
                    }}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    الغاء
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box mb={6} w="full" color="brand.black">
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="about">
            نبذة عنك
          </FormLabel>
          <Flex align={"center"} justify="space-between">
            <Textarea
              isDisabled={!isWantUpdateAbout}
              p={4}
              resize="none"
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete="off"
              id="about"
              name="about"
              size="lg"
              // onChange={(e) => setEmail(e.target.value)}
              value={USERDATA.about}
            />
            <Stack direction={"row"} spacing={2}>
              {!isWantUpdateAbout && (
                <Button
                  onClick={(e) => setIswantUpdateAbout(true)}
                  ms={2}
                  borderRadius={10}
                  colorScheme={"blue"}
                  _focus={{
                    outline: "none",
                  }}
                  _focusWithin={{
                    outline: "none",
                  }}
                >
                  تحديث
                </Button>
              )}
              {isWantUpdateAbout && (
                <>
                  <Button
                    // onClick={updateEmail}
                    isLoading={isUpdatingAbout}
                    ms={2}
                    borderRadius={10}
                    colorScheme={"orange"}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    حفظ
                  </Button>
                  <Button
                    onClick={(e) => {
                      setIswantUpdateAbout(false);
                      // setEmail(user?.email!);
                    }}
                    borderRadius={10}
                    bg="white"
                    color="gray.800"
                    _hover={{
                      background: "gray.200",
                    }}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    الغاء
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box mb={6} w="full" color="brand.black">
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="email">
            البريد الالكتروني
          </FormLabel>
          <Flex align={"center"} justify="space-between">
            <Input
              isDisabled={!isWantUpdateEmail}
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              size="lg"
              // onChange={(e) => setEmail(e.target.value)}
              value={USERDATA.email}
            />
            <Stack direction={"row"} spacing={2}>
              {!isWantUpdateEmail && (
                <Button
                  onClick={(e) => setIswantUpdateEmail(true)}
                  ms={2}
                  borderRadius={10}
                  colorScheme={"blue"}
                  _focus={{
                    outline: "none",
                  }}
                  _focusWithin={{
                    outline: "none",
                  }}
                >
                  تحديث
                </Button>
              )}
              {isWantUpdateEmail && (
                <>
                  <Button
                    // onClick={updateEmail}
                    isLoading={isUpdatingEmail}
                    ms={2}
                    borderRadius={10}
                    colorScheme={"orange"}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    حفظ
                  </Button>
                  <Button
                    onClick={(e) => {
                      setIswantUpdateEmail(false);
                      // setEmail(user?.email!);
                    }}
                    borderRadius={10}
                    bg="white"
                    color="gray.800"
                    _hover={{
                      background: "gray.200",
                    }}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    الغاء
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box mb={6} w="full" color="brand.black">
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="facebookaccount">
            رابط الفيسبوك
          </FormLabel>
          <Flex align={"center"} justify="space-between">
            <Input
              isDisabled={!isWantUpdateFacebookAccount}
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete="off"
              type="text"
              id="facebookaccount"
              name="facebookaccount"
              size="lg"
              // onChange={(e) => setEmail(e.target.value)}
              value={USERDATA.facebookAccount}
            />
            <Stack direction={"row"} spacing={2}>
              {!isWantUpdateFacebookAccount && (
                <Button
                  onClick={(e) => setIswantUpdateFacebookAccount(true)}
                  ms={2}
                  borderRadius={10}
                  colorScheme={"blue"}
                  _focus={{
                    outline: "none",
                  }}
                  _focusWithin={{
                    outline: "none",
                  }}
                >
                  تحديث
                </Button>
              )}
              {isWantUpdateFacebookAccount && (
                <>
                  <Button
                    // onClick={updateEmail}
                    isLoading={isUpdatingFacebookAccount}
                    ms={2}
                    borderRadius={10}
                    colorScheme={"orange"}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    حفظ
                  </Button>
                  <Button
                    onClick={(e) => {
                      setIswantUpdateFacebookAccount(false);
                      // setEmail(user?.email!);
                    }}
                    borderRadius={10}
                    bg="white"
                    color="gray.800"
                    _hover={{
                      background: "gray.200",
                    }}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    الغاء
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Box>
        <Box mb={6} w="full" color="brand.black">
          <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="instaaccount">
            رابط الانستغرام
          </FormLabel>
          <Flex align={"center"} justify="space-between">
            <Input
              isDisabled={!isWantUpdateInstaAccount}
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete="off"
              type="text"
              id="instaaccount"
              name="instaaccount"
              size="lg"
              // onChange={(e) => setEmail(e.target.value)}
              value={USERDATA.instaAccount}
            />
            <Stack direction={"row"} spacing={2}>
              {!isWantUpdateInstaAccount && (
                <Button
                  onClick={(e) => setIswantUpdateInstaAccount(true)}
                  ms={2}
                  borderRadius={10}
                  colorScheme={"blue"}
                  _focus={{
                    outline: "none",
                  }}
                  _focusWithin={{
                    outline: "none",
                  }}
                >
                  تحديث
                </Button>
              )}
              {isWantUpdateInstaAccount && (
                <>
                  <Button
                    // onClick={updateEmail}
                    isLoading={isUpdatingInstaAccount}
                    ms={2}
                    borderRadius={10}
                    colorScheme={"orange"}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    حفظ
                  </Button>
                  <Button
                    onClick={(e) => {
                      setIswantUpdateInstaAccount(false);
                      // setEmail(user?.email!);
                    }}
                    borderRadius={10}
                    bg="white"
                    color="gray.800"
                    _hover={{
                      background: "gray.200",
                    }}
                    _focus={{
                      outline: "none",
                    }}
                    _focusWithin={{
                      outline: "none",
                    }}
                  >
                    الغاء
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Box>
        <Flex mb={6} w="full">
          <Box ml={6} w="full" color="brand.black">
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="field">
              المجال
            </FormLabel>
            <Input
              isDisabled={true}
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete="off"
              type="text"
              id="field"
              name="field"
              size="lg"
              value={USERDATA.field}
            />
          </Box>
          <Box w="full" color="brand.black">
            <FormLabel fontSize={"lg"} fontWeight={900} htmlFor="speciality">
              التخصص
            </FormLabel>
            <Input
              isDisabled={true}
              p={4}
              borderRadius={10}
              bg={"blackAlpha.100"}
              border={0}
              _focus={{
                bg: "blackAlpha.200",
              }}
              _disabled={{
                bg: "blackAlpha.100",
              }}
              autoComplete="off"
              type="text"
              id="speciality"
              name="speciality"
              size="lg"
              value={USERDATA.speciality}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

EditProfile.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default EditProfile;
