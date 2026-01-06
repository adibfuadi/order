import { parseAsString, useQueryStates } from "nuqs";

const useStudentTableFilter = () => {
  return useQueryStates({
    keyword: parseAsString,
  });
};

export default useStudentTableFilter;
