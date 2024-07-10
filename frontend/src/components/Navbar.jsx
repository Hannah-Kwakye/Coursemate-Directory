import { Box, Link, Button, Container, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"; // Import Chakra UI components and hooks
import { IoMoon } from "react-icons/io5"; // Import moon icon for dark mode
import { LuSun } from "react-icons/lu"; // Import sun icon for light mode
import CreateUserModal from "./CreateUserModal"; // Import custom modal component

const Navbar = ({ setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode(); // Use Chakra UI hook to get current color mode and function to toggle it
  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)"); // Set semi-transparent background color based on color mode
  const textColor = useColorModeValue("black", "white"); // Set text color based on color mode

  return (
    <Box
      width="95%" // Set width to 95%
      height="75%" // Reduce height by 25%
      mx="auto" // Center horizontally with auto margins
      my={4} // Add vertical margin
      p={4} // Add padding
      borderRadius="15px" // Rounded corners
      bg={bgColor} // Background color for glassmorphism effect
      backdropFilter="blur(10px)" // Apply blur effect for glassmorphism
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // Add shadow for depth
      fontFamily="Poppins" // Custom font
    >
      <Container maxW="1200px"> {/* Container to center content with max width */}
        <Flex h="12" alignItems="center" justifyContent="space-between"> {/* Flex container to align items horizontally and space them out */}
          {/* Left side */}
          <Flex alignItems="center" justifyContent="center" gap={5}> {/* Flex container for left side icons and text with gap between items */}
            
            <img src="/python.png" alt="Python logo" width={40} height={40} /> {/* Python logo */}
            <Text fontSize="2xl" fontWeight="bold" color={textColor}> {/* Equals sign */}
              Course Mate
            </Text>
          </Flex>
          {/* Right side */}
          <Flex gap={5} alignItems="center"> {/* Flex container for right side text and buttons with gap between items */}
		  <Link
              href="https://www.linkedin.com/in/shoaib-ahamed-ms-mba-a863ba27/"
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
              display={{ base: "none", md: "block" }}
              _hover={{ textDecoration: "underline" }}
            > 
              Pace University by Prof. Shoaib
            </Link>
            <Button
              onClick={toggleColorMode}
              bg={useColorModeValue("purple.500", "orange.300")}
              color={textColor}
              _hover={{ bg: useColorModeValue("purple.600", "orange.400") }}
            > {/* Button to toggle color mode with hover effect */}
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />} {/* Display moon icon for light mode and sun icon for dark mode */}
            </Button>
            <CreateUserModal setUsers={setUsers} /> {/* Custom modal component for creating a user */}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar; // Export Navbar component as default