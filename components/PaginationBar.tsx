import { Button, Stack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface PaginationBarProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  max: number;
  itemsPerPage: number;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  setCurrentPage,
  max,
  itemsPerPage,
}) => {
  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handleBack = () => setCurrentPage((prev) => prev - 1);
  const isLastPage = () => itemsPerPage * (currentPage + 1) >= max;

  return (
    <Stack direction='row' paddingBlock={10}>
      <Button disabled={isLastPage()} onClick={handleNext}>
        التالي
      </Button>

      <Button disabled={currentPage === 0} onClick={handleBack}>
        السابق
      </Button>
    </Stack>
  );
};

export default PaginationBar;
