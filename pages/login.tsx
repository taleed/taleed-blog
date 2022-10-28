import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'

import NextLink from 'next/link'
import { supabase } from '@/utils/supabaseClient'
import { useForm } from 'react-hook-form'

type loginValues = {
    email: string,
    password: string
}


const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<loginValues>()
      
    const onSubmit = async (userInfo) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password:  userInfo.password,
        })
    }
    return ( 
        <Box py="40px" bg="url(/bglogo.png)">
            <Box mx="auto" maxW="500px" bg="white" rounded="15px">
                
                <Box p="40px">
                    <Heading fontSize="20px" color="brand.primary">تسجيل الدخول</Heading>
                    <Text mb="20px" mt="5px" fontSize="16px">انضم الينا وكن من اشهر المحررين</Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            autoComplete="off"
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password} my="20px">
                            <Input
                            id='password'
                            type="password"
                            placeholder='كلمة السر'
                            {...register('password', {
                                required: "هذا الحقل اجباري",
                            })}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
                            تسجيل
                        </Button>
                    </form>
                </Box>  
                <Box bgColor="brand.primary" roundedBottom="10px" textAlign="center" py="10px">
                    <Text color="white">
                        ليس لديك حساب ؟
                        <NextLink href="/signup">
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
                                انشاء حساب جديد
                            </Button>
                        </NextLink>
                    </Text>
                </Box>
            </Box>
        </Box>   
    );
}
 
export default Login;