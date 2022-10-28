import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Image,
    Input,
    Select,
    Text,
    Textarea,
} from '@chakra-ui/react'

import NextLink from 'next/link'
import { supabase } from '@/utils/supabaseClient'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type loginOneValues = {
    firstName: string,
    lastName: string,
    username: string,
}
type loginTwoValues = {
    domain: string,
    specialty: string,
    bio: string,
}
type loginThreeValues = {
    email: string,
    password: string,
    imgUrl: string,
}

const StepOne = ({firstName, lastName, username, setFirstName, setLastName, setUsername, setStep}) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<loginOneValues>()
        
    const onSubmit = (userInfo) => {
        setFirstName(userInfo.firstName)
        setLastName(userInfo.lastName)
        setUsername(userInfo.username)
        setStep(2)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
                <FormControl isInvalid={errors.firstName}>
                    <Input
                    id='firstName'
                    placeholder='الاسم'
                    {...register('firstName', {
                        required: "هذا الحقل اجباري",
                        minLength: {
                            value: 2,
                            message: "يجب ان يحتوي اللقب على حرفين او اكثر"
                        }
                    })}
                    defaultValue={firstName}
                    autoComplete="off"
                    />
                    <FormErrorMessage>
                        {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.lastName} mr="10px">
                    <Input
                    id='lastName'
                    placeholder='اللقب'
                    {...register('lastName', {
                        required: "هذا الحقل اجباري",
                        minLength: {
                            value: 2,
                            message: "يجب ان يحتوي اللقب على حرفين او اكثر"
                        }
                    })}
                    defaultValue={lastName}
                    autoComplete="off"
                    />
                    <FormErrorMessage>
                        {errors.lastName && errors.lastName.message}
                    </FormErrorMessage>
                </FormControl>
            </Flex>
            
            <FormControl isInvalid={errors.username} my="10px">
                <Input
                id='username'
                placeholder='اسم المستخدم'
                {...register('username', {
                    required: "هذا الحقل اجباري",
                    minLength: {
                        value: 5,
                        message: "يجب ان يحتوي اسم المستخدم على 5 احرف او اكثر"
                    }
                })}
                defaultValue={username}
                />
                <FormErrorMessage>
                    {errors.username && errors.username.message}
                </FormErrorMessage>
            </FormControl>
            <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
                التالي
            </Button>
        </form>
    )
}
const StepTwo = ({domain, specialty, bio, setDomain, setSpecialty, setBio, setStep}) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<loginTwoValues>()
        
    const onSubmit = (userInfo) => {
        setDomain(userInfo.domain)
        setSpecialty(userInfo.specialty)
        setBio(userInfo.bio)
        setStep(3)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
                <FormControl isInvalid={errors.domain}>
                    <Select 
                        id='domain'
                        placeholder='المجال'
                        {...register('domain', {
                            required: "هذا الحقل اجباري",
                        })}>
                        <option value='writer'>كاتب</option>
                        <option value='poet'>شاعر</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.domain && errors.domain.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.specialty} mr="10px">
                    <Input
                    id='specialty'
                    placeholder='التخصص'
                    {...register('specialty', {
                        required: "هذا الحقل اجباري",
                        minLength: {
                            value: 3,
                            message: "يجب ان يحتوي التخصص على 3 احرف او اكثر"
                        }
                    })}
                    autoComplete="off"
                    defaultValue={specialty}
                    />
                    <FormErrorMessage>
                        {errors.specialty && errors.specialty.message}
                    </FormErrorMessage>
                </FormControl>
            </Flex>
            
            <FormControl isInvalid={errors.bio} my="10px">
            <Textarea
                    id='bio'
                    placeholder='نبذة عنك'
                    {...register('bio', {
                        required: "هذا الحقل اجباري",
                        minLength: {
                            value: 5,
                            message: "يجب ان يحتوي هذا الحقل على 5 احرف او اكثر"
                        }
                    })}
                    defaultValue={bio}
                />
                <FormErrorMessage>
                    {errors.bio && errors.bio.message}
                </FormErrorMessage>
            </FormControl>
            <Flex>
                <Button colorScheme='teal' isLoading={isSubmitting} type='submit' ml="10px">
                التالي
                </Button>
                <Button
                    bgColor="transparent"
                    border="2px solid"
                    cursor="pointer"
                    borderColor="transparent"
                    color="brand.black"
                    _active={{bgColor: "transparent", borderColor: "brand.primary", color: "brand.primary"}}
                    _hover={{bgColor: "transparent", borderColor: "brand.primary", color: "brand.primary"}}
                    mr="8px"
                    px="10px"
                    onClick={() => setStep(1)}
                    >
                    السابق 
                    </Button>
            </Flex>
            
        </form>
    )
}
const StepThree = ({email, imgUrl, setEmail, setPassword, setImgUrl, setStep}) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<loginThreeValues>()
        
    const onSubmit = (userInfo) => {
        setEmail(userInfo.email)
        setPassword(userInfo.password)
        setImgUrl(userInfo.imgUrl)
        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
                <Box w="45%" ml="20px">
                    <Image src="/signupimg.svg" alt="file image" w="100px" height="100px" mx="auto" mb="20px"/>
                    <FormControl isInvalid={errors.imgUrl}>
                        <FormLabel
                            htmlFor="imgUrl"
                            textAlign="center"
                            w="full"
                            cursor="pointer"
                            >
                                قم باختيار صورتك الشخصية
                        </FormLabel>
                        <Input
                        id='imgUrl'
                        type="file"
                        accept="image/*"
                        position="absolute"
                        visibility="hidden"
                        {...register('imgUrl', {
                            required: "هذا الحقل اجباري",
                        })}
                        border="none"
                        />
                        <FormErrorMessage>
                            {errors.imgUrl && errors.imgUrl.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box w="55%">
                    <FormControl isInvalid={errors.email}>
                        <Input
                        id='email'
                        placeholder='الايميل'
                        {...register('email', {
                            required: "هذا الحقل اجباري",
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: "هذا الايميل غير صحيح"
                            }
                        })}
                        defaultValue={email}
                        autoComplete="off"
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password} my="10px">
                        <Input
                        id='password'
                        type="password"
                        placeholder='كلمة السر'
                        {...register('password', {
                            required: "هذا الحقل اجباري",
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "يجب ان تحتوي كلمة السر على 8 احرف او اكثر مع حرف على الاقل او رقم على الاقل"
                            }
                        })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.repassword} mb="10px">
                        <Input
                        id='repassword'
                        placeholder='اعادة ادخال كلمة السر'
                        type="password"
                        {...register('repassword', {
                            required: "هذا الحقل اجباري",
                        })}
                        />
                        <FormErrorMessage>
                            {errors.repassword && errors.repassword.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Checkbox mb="30px">
                        قرأت واوافق على 
                        <NextLink href="/login">
                            <Text as="a" color="brand.primary" fontWeight="600"> الشروط </Text>
                        </NextLink>
                    </Checkbox>
                </Box>
            </Flex>
            
            <Flex>
                <Button colorScheme='teal' isLoading={isSubmitting} type='submit' ml="10px">
                انشاء الحساب
                </Button>
                <Button
                    bgColor="transparent"
                    border="2px solid"
                    cursor="pointer"
                    borderColor="transparent"
                    color="brand.black"
                    _active={{bgColor: "transparent", borderColor: "brand.primary", color: "brand.primary"}}
                    _hover={{bgColor: "transparent", borderColor: "brand.primary", color: "brand.primary"}}
                    mr="8px"
                    px="10px"
                    onClick={() => setStep(2)}
                    >
                    السابق 
                    </Button>
            </Flex>
            
        </form>
    )
} 

const SignUp = () => {
    const [step, setStep] = useState(1)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [domain, setDomain] = useState('')
    const [specialty, setSpecialty] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    return ( 
        <Box py="40px" bg="url(/bglogo.png)">
            <Box mx="auto" maxW="700px" bg="white" rounded="15px">
                
                <Box p="40px">
                    <Heading fontSize="20px" color="brand.primary" mb="20px">اخبرنا عنك</Heading>
                    {step == 1 && <StepOne setStep={setStep} firstName={firstName} lastName={lastName} username={username} setFirstName={setFirstName} setLastName={setLastName} setUsername={setUsername} />}
                    {step == 2 && <StepTwo setStep={setStep} domain={domain} specialty={specialty} bio={bio} setDomain={setDomain} setSpecialty={setSpecialty} setBio={setBio} />}
                    {step == 3 && <StepThree setStep={setStep} email={email} imgUrl={imgUrl} setEmail={setEmail} setPassword={setPassword} setImgUrl={setImgUrl} />}
                </Box>  
                <Box bgColor="brand.primary" roundedBottom="10px" textAlign="center" py="10px">
                    <Text color="white">
                        لديك حساب ؟
                        <NextLink href="/login">
                            <Button
                                as="a"
                                bgColor="transparent"
                                rounded="0px"
                                borderBottom="2px solid"
                                cursor="pointer"
                                borderColor="transparent"
                                color="white"
                                _active={{bgColor: "transparent", borderColor: "white"}}
                                _hover={{bgColor: "transparent", borderColor: "white"}}
                                h="fit-content"
                                mr="8px"
                                px="0px"
                                py="4px"
                                >
                                تسجيل الدخول
                            </Button>
                        </NextLink>
                    </Text>
                </Box>
            </Box>
        </Box>   
    );
  }
   
export default SignUp;