import { Container, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";
import { useState } from "react";

// Define base URL for API based on development or production environment
export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
    // State to manage user data
    const [users, setUsers] = useState([]);
    // Hook to access current color mode (light or dark)
    const { colorMode } = useColorMode();

    return (
        // Stack component to contain the entire application content
        <Stack minH="100vh" bg={useColorModeValue("gray.100", "gray.800")} py={4}>
            {/* Navbar component with setUsers prop */}
            <Navbar setUsers={setUsers} />

            {/* Container to limit content width and provide vertical margin */}
            <Container maxW="1200px" my={4} textAlign="center">
                {/* Header text styled with a beautiful font */}
                <Text
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="bold"
                    letterSpacing="wide"
					textTransform="capitalize"
                    mb={8}
                    color={useColorModeValue("teal.500", "teal.300")}
                    fontFamily="Montserrat, sans-serif" // Replace with a beautiful font of your choice
                    textAlign="center"
                >
                    Summer 2024
                </Text>

                {/* UserGrid component to display user data */}
                <UserGrid users={users} setUsers={setUsers} />
            </Container>
        </Stack>
    );
}

export default App;





// import { Container, Stack, Text } from "@chakra-ui/react";


// import Navbar from "./components/Navbar";
// import UserGrid from "./components/UserGrid";
// import { useState } from "react";

// // updated this after recording. Make sure you do the same so that it can work in production
// export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

// function App() {
// 	const [users, setUsers] = useState([]);

// 	return (
// 		<Stack minH={"100vh"}>
// 			<Navbar setUsers={setUsers} />

// 			<Container maxW={"1200px"} my={4}>
// 				<Text
// 					fontSize={{ base: "3xl", md: "50" }}
// 					fontWeight={"bold"}
// 					letterSpacing={"2px"}
// 					textTransform={"uppercase"}
// 					textAlign={"center"}
// 					mb={8}
// 				>
// 					<Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
// 						Python Class Mate : Summer 2024
// 					</Text>
// 					🚀
// 				</Text>

// 				<UserGrid users={users} setUsers={setUsers} />
// 			</Container>
// 		</Stack>
// 	);
// }

// export default App;
