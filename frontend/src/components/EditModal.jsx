import {
	Button,
	Tooltip,
	IconButton,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { BiEditAlt } from "react-icons/bi";
  import { BASE_URL } from "../App";
  
  function EditModal({ setUsers, user }) {
	// Hooks for modal state and form inputs
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
	  name: user.name,
	  role: user.role,
	  description: user.description,
	});
	const toast = useToast();
  
	// Function to handle form submission for editing user
	const handleEditUser = async (e) => {
	  e.preventDefault();
	  setIsLoading(true);
	  try {
		// Send PATCH request to update user data
		const res = await fetch(BASE_URL + "/coursemates/" + user.id, {
		  method: "PATCH",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(inputs),
		});
		const data = await res.json();
		if (!res.ok) {
		  throw new Error(data.error);
		}
		// Update local state with new user data
		setUsers((prevUsers) =>
		  prevUsers.map((u) => (u.id === user.id ? data : u))
		);
		// Show success toast notification
		toast({
		  status: "success",
		  title: "Yayy! 🎉",
		  description: "Course Mate updated successfully.",
		  duration: 2000,
		  position: "top-center",
		});
		// Close the modal after successful update
		onClose();
	  } catch (error) {
		// Show error toast notification if update fails
		toast({
		  status: "error",
		  title: "An error occurred.",
		  description: error.message,
		  duration: 4000,
		  position: "top-center",
		});
	  } finally {
		setIsLoading(false); // Reset loading state
	  }
	};
  
	return (
	  <>
		{/* Button to open the modal */}
		{/* <Button
		  onClick={onOpen}
		  colorScheme="teal" // Change button color scheme
		  size="sm" // Adjust button size
		  leftIcon={<BiEditAlt />} // Use BiEditAlt icon
		  mt={4} // Add top margin
		>
		  Edit
		</Button> */}

		<Tooltip label="Edit Mate">
              <IconButton
                variant="ghost"
                colorScheme="teal" // Change button color scheme
                size="sm"
                aria-label="Delete Mate"
                icon={<BiEditAlt size={30} />} // Use BiEditAlt icon
                onClick={onOpen}
              />
            </Tooltip>
  
		{/* Modal for editing user details */}
		<Modal isOpen={isOpen} onClose={onClose}>
		  <ModalOverlay />
		  <form onSubmit={handleEditUser}>
			<ModalContent
			  bg="gray.900" // Change modal background color
			  color="white" // Change text color
			>
			  {/* Modal header */}
			  <ModalHeader
				textAlign="center" // Center align header text
				borderBottomWidth="1px" // Add bottom border to header
				borderColor="gray.700" // Border color
			  >
				Edit Mate
			  </ModalHeader>
			  <ModalCloseButton />
  
			  {/* Modal body */}
			  <ModalBody pb={6}>
				<Flex alignItems={"center"} flexDirection="column" gap={4}>
				  {/* Form control for Full Name */}
				  <FormControl w="80%">
					<FormLabel>Full Name</FormLabel>
					<Input
					  placeholder="John Doe"
					  value={inputs.name}
					  onChange={(e) =>
						setInputs((prev) => ({ ...prev, name: e.target.value }))
					  }
					/>
				  </FormControl>
  
				  {/* Form control for Role */}
				  <FormControl w="80%">
					<FormLabel>Role</FormLabel>
					<Input
					  placeholder="Software Engineer"
					  value={inputs.role}
					  onChange={(e) =>
						setInputs((prev) => ({ ...prev, role: e.target.value }))
					  }
					/>
				  </FormControl>
  
				  {/* Form control for Description */}
				  <FormControl w="80%">
					<FormLabel>Description</FormLabel>
					<Textarea
					  resize={"none"}
					  overflowY={"hidden"}
					  placeholder="He's a software engineer who loves to code and build things."
					  value={inputs.description}
					  onChange={(e) =>
						setInputs((prev) => ({
						  ...prev,
						  description: e.target.value,
						}))
					  }
					/>
				  </FormControl>
				</Flex>
			  </ModalBody>
  
			  {/* Modal footer */}
			  <ModalFooter justifyContent="center"> {/* Center align footer */}
				{/* Button to submit edited user details */}
				<Button
				  colorScheme="teal"
				  mr={3}
				  type="submit"
				  isLoading={isLoading} // Show loading spinner while submitting
				>
				  Update
				</Button>
				{/* Button to close the modal */}
				<Button onClick={onClose}>Cancel</Button>
			  </ModalFooter>
			</ModalContent>
		  </form>
		</Modal>
	  </>
	);
  }
  
  export default EditModal;
  







// import {
// 	Button,
// 	Flex,
// 	FormControl,
// 	FormLabel,
// 	IconButton,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalOverlay,
// 	Textarea,
// 	useDisclosure,
// 	useToast,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { BiEditAlt } from "react-icons/bi";
// import { BASE_URL } from "../App";

// function EditModal({ setUsers, user }) {
// 	const { isOpen, onOpen, onClose } = useDisclosure();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [inputs, setInputs] = useState({
// 		name: user.name,
// 		role: user.role,
// 		description: user.description,
// 	});
// 	const toast = useToast();

// 	const handleEditUser = async (e) => {
// 		e.preventDefault();
// 		setIsLoading(true);
// 		try {
// 			const res = await fetch(BASE_URL + "/friends/" + user.id, {
// 				method: "PATCH",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify(inputs),
// 			});
// 			const data = await res.json();
// 			if (!res.ok) {
// 				throw new Error(data.error);
// 			}
// 			setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
// 			toast({
// 				status: "success",
// 				title: "Yayy! 🎉",
// 				description: "Friend updated successfully.",
// 				duration: 2000,
// 				position: "top-center",
// 			});
// 			onClose();
// 		} catch (error) {
// 			toast({
// 				status: "error",
// 				title: "An error occurred.",
// 				description: error.message,
// 				duration: 4000,
// 				position: "top-center",
// 			});
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<>
// 			<IconButton
// 				onClick={onOpen}
// 				variant='ghost'
// 				colorScheme='blue'
// 				aria-label='See menu'
// 				size={"sm"}
// 				icon={<BiEditAlt size={20} />}
// 			/>

// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />
// 				<form onSubmit={handleEditUser}>
// 					<ModalContent>
// 						<ModalHeader>My new BFF 😍</ModalHeader>
// 						<ModalCloseButton />
// 						<ModalBody pb={6}>
// 							<Flex alignItems={"center"} gap={4}>
// 								<FormControl>
// 									<FormLabel>Full Name</FormLabel>
// 									<Input
// 										placeholder='John Doe'
// 										value={inputs.name}
// 										onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
// 									/>
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel>Role</FormLabel>
// 									<Input
// 										placeholder='Software Engineer'
// 										value={inputs.role}
// 										onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))}
// 									/>
// 								</FormControl>
// 							</Flex>
// 							<FormControl mt={4}>
// 								<FormLabel>Description</FormLabel>
// 								<Textarea
// 									resize={"none"}
// 									overflowY={"hidden"}
// 									placeholder="He's a software engineer who loves to code and build things."
// 									value={inputs.description}
// 									onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
// 								/>
// 							</FormControl>
// 						</ModalBody>

// 						<ModalFooter>
// 							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
// 								Update
// 							</Button>
// 							<Button onClick={onClose}>Cancel</Button>
// 						</ModalFooter>
// 					</ModalContent>
// 				</form>
// 			</Modal>
// 		</>
// 	);
// }

// export default EditModal;

