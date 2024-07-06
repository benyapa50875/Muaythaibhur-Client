import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import TopParagraph from "../../components/user/home/TopParagraph";
import HeroSection from "../../components/user/home/HeroSection";

function HomePage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/homepage");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching homepage entries:", error);
    }
  };

  return (
    <Box p={10}>
      {entries.length > 0 && (
        <>
          <Box pt={14}>
            <TopParagraph
              header={entries[0].header1}
              sub={entries[0].paragraph1}
              button1={entries[0].button1_1}
              button2={entries[0].button1_2}
            />
          </Box>

          <Box>
            <HeroSection
              hero_img={entries[0].hero_img}
              sub={entries[0].subheader2}
              header={entries[0].header2}
              icon1={entries[0].icon1}
              list1={entries[0].list1}
              ld_1={entries[0].list1_detail}
              icon2={entries[0].icon2}
              list2={entries[0].list2}
              ld_2={entries[0].list2_detail}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default HomePage;
