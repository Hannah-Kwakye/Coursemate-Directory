import { Avatar, Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, Tooltip, useToast } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
  const toast = useToast();

  // Function to handle deleting a user
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/coursemates/" + user.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      // Update state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      // Show success toast message
      toast({
        status: "success",
        title: "Success",
        description: "Course Mate deleted successfully.",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      // Show error toast message if deletion fails
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-center",
      });
    }
  };

  return (
    <Card
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={4}
      boxShadow="md"
      bg="gray.700" // Updated background color of the card
      color="white" // Text color
    >
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" flex="1">
            <Avatar src={user.imgUrl} size="md" />
            <Box ml={4}>
              <Heading size="sm">{user.name}</Heading>
              <Text fontSize="sm" color="gray.400">{user.role}</Text>
            </Box>
          </Flex>
          <Flex>
            {/* Edit user modal */}
            <EditModal user={user} setUsers={setUsers} />
            {/* Delete user button */}
            <Tooltip label="Delete mate">
              <IconButton
                variant="ghost"
                colorScheme="teal"
                size="sm"
                aria-label="Delete mate"
                icon={<BiTrash size={30} />}
                onClick={handleDeleteUser}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text textAlign="left">{user.description}</Text> {/* Description left aligned */}
      </CardBody>
    </Card>
  );
};

export default UserCard;




// import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
// import { BiTrash } from "react-icons/bi";
// import EditModal from "./EditModal";
// import { BASE_URL } from "../App";

// const UserCard = ({ user, setUsers }) => {
// 	const toast = useToast();
// 	const handleDeleteUser = async () => {
// 		try {
// 			const res = await fetch(BASE_URL + "/friends/" + user.id, {
// 				method: "DELETE",
// 			});
// 			const data = await res.json();
// 			if (!res.ok) {
// 				throw new Error(data.error);
// 			}
// 			setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
// 			toast({
// 				status: "success",
// 				title: "Success",
// 				description: "Friend deleted successfully.",
// 				duration: 2000,
// 				position: "top-center",
// 			});
// 		} catch (error) {
// 			toast({
// 				title: "An error occurred",
// 				description: error.message,
// 				status: "error",
// 				duration: 4000,
// 				isClosable: true,
// 				position: "top-center",
// 			});
// 		}
// 	};
// 	return (
// 		<Card>
// 			<CardHeader>
// 				<Flex gap={4}>
// 					<Flex flex={"1"} gap={"4"} alignItems={"center"}>
// 						<Avatar src={user.imgUrl} />

// 						<Box>
// 							<Heading size='sm'>{user.name}</Heading>
// 							<Text>{user.role}</Text>
// 						</Box>
// 					</Flex>

// 					<Flex>
// 						<EditModal user={user} setUsers={setUsers} />
// 						<IconButton
// 							variant='ghost'
// 							colorScheme='red'
// 							size={"sm"}
// 							aria-label='See menu'
// 							icon={<BiTrash size={20} />}
// 							onClick={handleDeleteUser}
// 						/>
// 					</Flex>
// 				</Flex>
// 			</CardHeader>

// 			<CardBody>
// 				<Text>{user.description}</Text>
// 			</CardBody>
// 		</Card>
// 	);
// };
// export default UserCard;
