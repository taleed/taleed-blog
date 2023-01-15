import { supabase } from "@/utils/supabaseClient";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

interface ResetPasswordProps {
  modal: any;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ modal }) => {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  //   Colors
  const modalBg = useColorModeValue("white", "brand.black");
  const inputBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const focusBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  const handleUpdateUserPassword = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({ password });

      if (error || !data) throw Error(error?.message ?? "");

      successNotification();

      modal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const successNotification = () => {
    toast({
      title: "تم إعادة تعيين كلمة السر بنجاح",
      status: "success",
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <div>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>إعادة تعيين كلمة السر</ModalHeader>
          <ModalBody>
            <Box pb={6}>
              <FormControl my={6} isRequired isInvalid={password.length < 7}>
                <FormLabel htmlFor='title'>كلمة المرور الجديدة</FormLabel>
                <Input
                  bg={inputBg}
                  border={0}
                  _focus={{ bg: focusBg }}
                  borderRadius={10}
                  type='password'
                  placeholder='أدخل كلمة المرور الجديدة'
                  size='lg'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl my={6} isRequired isInvalid={confirmation !== password}>
                <FormLabel htmlFor='title'>تأكيد كلمة المرور الجديدة</FormLabel>
                <Input
                  bg={inputBg}
                  border={0}
                  _focus={{ bg: focusBg }}
                  borderRadius={10}
                  type='password'
                  placeholder='أدخل تأكيد كلمة المرور الجديدة'
                  size='lg'
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                />
              </FormControl>

              <Button
                p={6}
                size='lg'
                color='white'
                variant='solid'
                borderRadius={10}
                bg='brand.secondary'
                _hover={{ opacity: 0.8 }}
                _focus={{ opacity: 0.9, color: "white", outline: "none" }}
                _focusWithin={{ opacity: 0.9, bg: "brand.secondary" }}
                _disabled={{ bg: "#81EAFB6B", pointerEvents: "none" }}
                isLoading={loading}
                disabled={password.length < 7 || confirmation !== password || loading}
                onClick={handleUpdateUserPassword}>
                تحديث كلمة المرور
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ResetPassword;
