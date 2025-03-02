import { Divider } from "@mantine/core";
import SearchBar from "../Findjobs/SearchBar";
import Jobs from "../Findjobs/Jobs";

function Findjobs() {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins ">
      <SearchBar></SearchBar>
      <Divider size="xs" mx="md"></Divider>
      <Jobs></Jobs>
    </div>
  );
}

export default Findjobs;
