import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Box, Flex, Text } from "@chakra-ui/react"

export function LoginUser() {
  return (
    <>
      <Flex
        bgGradient="linear(to-b, #0f0c29, #302b63, #24243e)"
        alignItems="center"
        justifyContent="space-evenly"
        minH="100vh"
      >
        <Box display={{ base: "none", lg: "block" }}>
          <Flex justifyContent="center" alignItems="center" minH="100%">
            <svg
              width="251"
              height="161"
              viewBox="0 0 251 161"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="35.14"
                width="49.6955"
                height="49.6955"
                transform="rotate(-45 0 35.14)"
                fill="white"
              />
              <rect
                x="45.1796"
                y="80.3207"
                width="49.6955"
                height="49.6955"
                transform="rotate(-45 45.1796 80.3207)"
                fill="white"
              />
              <rect
                x="90.359"
                y="35.14"
                width="49.6955"
                height="49.6955"
                transform="rotate(-45 90.359 35.14)"
                fill="white"
              />
              <rect
                x="90.359"
                y="125.5"
                width="49.6955"
                height="49.6955"
                transform="rotate(-45 90.359 125.5)"
                fill="white"
              />
              <rect
                x="135.54"
                y="80.3207"
                width="49.6955"
                height="49.6955"
                transform="rotate(-45 135.54 80.3207)"
                fill="white"
              />
              <rect
                x="180.719"
                y="35.14"
                width="49.6955"
                height="49.6955"
                transform="rotate(-45 180.719 35.14)"
                fill="white"
              />
            </svg>
          </Flex>
        </Box>

        <Flex justifyContent="center" alignItems="center" minH="100%">
          <Flex
            flexDirection="column"
            alignItems="center"
            gap={6}
            bg="white"
            p="32px"
          >
            <Box p="12px" borderWidth="1px" borderRadius="lg">
              <svg
                width="21"
                height="14"
                viewBox="0 0 21 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2.94L2.94 0L5.88001 2.94L2.94 5.88001L0 2.94Z"
                  fill="#9C89F6"
                />
                <path
                  d="M3.78 6.72L6.72 3.78L9.66001 6.72L6.72 9.66001L3.78 6.72Z"
                  fill="#9C89F6"
                />
                <path
                  d="M7.55999 2.94L10.5 0L13.44 2.94L10.5 5.88001L7.55999 2.94Z"
                  fill="#9C89F6"
                />
                <path
                  d="M7.55999 10.5L10.5 7.55999L13.44 10.5L10.5 13.44L7.55999 10.5Z"
                  fill="#5137C5"
                />
                <path
                  d="M11.34 6.72L14.28 3.78L17.22 6.72L14.28 9.66001L11.34 6.72Z"
                  fill="#5137C5"
                />
                <path
                  d="M15.12 2.94L18.06 0L21 2.94L18.06 5.88001L15.12 2.94Z"
                  fill="#5137C5"
                />
              </svg>
            </Box>
            <Text color="#101828" fontWeight="600" fontSize="16px">
              Log in to your account
            </Text>
            <p className="text-balance text-muted-foreground text-sm">
              Welcome back! Please enter your details.
            </p>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
            <Separator></Separator>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
