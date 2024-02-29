import Head from "next/head"
import {
  Avatar,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react"
import { WeaveDBLogo, WeaveDBLogoText } from "@/components/images/icons/icons"
import { AddIcon } from "@chakra-ui/icons"
import { useState, Fragment } from "react"

const CardDeployment = () => {
  return (
    <>
      <Box padding="28px" border="1px">
        <Flex
          alignItems="center"
          paddingBottom="28px"
          justifyContent={{ base: "space-between", md: "space-between" }}
        >
          <Box
            boxSize="40px"
            borderRadius="full"
            bgGradient="linear(to-br, #ae4c3c, #692dd1)"
          />
          <Text paddingLeft="8px">My Sample Rollup</Text>
        </Flex>

        <Flex justifyContent="space-between">
          <Flex flexDirection="column">
            <Text>Status</Text>
            <Flex alignItems="center">
              <Box borderRadius="full" bg="red.500" boxSize="16px" />
              <Text paddingLeft="8px">Stopped</Text>
            </Flex>
          </Flex>

          <Flex flexDirection="column" paddingLeft="28px">
            <Text>Created</Text>
            <Text>2 hours ago</Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default function Home() {
  const [deployments, setDeployments] = useState([])
  const deployRollup = async () => {
    setDeployments((prevDeployments) => [
      ...prevDeployments,
      <CardDeployment key={prevDeployments.length} />,
    ])
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider>
        <Flex padding="28px" flexDirection="column" gap="48px">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            // flexGrow="1"
          >
            <Flex alignItems="center">
              <Flex>
                <WeaveDBLogoText width="131px" height="29px" />
              </Flex>

              <Select
                paddingLeft="48px"
                defaultValue="Organization 1"
                display={{ base: "none", md: "block" }}
              >
                <option value="option1">Organization 1</option>
                <option value="option2">Organization 2</option>
                <option value="option3">Organization 3</option>
              </Select>
            </Flex>

            <Avatar />
          </Flex>

          <Flex justifyContent="flex-end">
            <Button leftIcon={<AddIcon />} onClick={deployRollup}>
              Deploy Rollup
            </Button>
          </Flex>

          <Heading>Deployments</Heading>

          <Flex
            gap="48px"
            flexDirection={{ base: "column", md: "column" }}
            paddingX={{ md: "488px" }}
          >
            {deployments.map((deployment, index) => (
              <Fragment key={index}>{deployment}</Fragment>
            ))}
          </Flex>

          <Flex>
            <Box />
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  )
}
