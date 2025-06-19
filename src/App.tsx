import { Box, Flex, VStack, Button, Heading, Text, Container, HStack, SimpleGrid, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Tag, Icon, useToast, Select, Grid, Badge, Stat, StatLabel, StatNumber, StatHelpText, Progress } from "@chakra-ui/react";
import { LayoutDashboard, Zap, Clock, Plus, Settings, Play, Pause, Trash2, Users, Activity, Globe } from "lucide-react";
import { FaMinecraft } from "react-icons/fa";
import { motion, useCallback, useState } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

// Enhanced Wave Pattern with Animation
const WavePattern = ({ color = "rgba(162, 89, 255, 0.1)", ...props }) => (
  <Box position="absolute" w="100%" overflow="hidden" {...props}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" width="100%" height="100%">
      <motion.path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        fill={color}
        initial={{ x: 0 }}
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        fill={color}
        initial={{ x: 0 }}
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        fill={color}
        initial={{ x: 0 }}
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </Box>
);

const Hexagon = ({ size = 100, color = "#A259FF" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <polygon
      points="24,4 44,14 44,34 24,44 4,34 4,14"
      fill={color}
      opacity="0.4"
      style={{ filter: `drop-shadow(0 0 10px ${color}44)` }}
    />
  </svg>
);

const FloatingHexagon = ({
  size = 100,
  color = "#A259FF",
  opacity = 0.1,
  initialX = 0,
  initialY = 0,
  duration = 20,
  delay = 0,
}) => {
  return (
    <MotionBox
      position="absolute"
      pointerEvents="none"
      initial={{ x: initialX, y: initialY }}
      animate={{
        x: [initialX, initialX + 50, initialX, initialX - 30, initialX],
        y: [initialY, initialY + 30, initialY + 50, initialY + 30, initialY],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
      opacity={opacity}
      filter="blur(0.5px)"
      zIndex={0}
      aria-hidden="true"
    >
      <Hexagon size={size} color={color} />
    </MotionBox>
  );
};

const GlassCard = ({ children, ...props }) => (
  <Box
    bg="rgba(255, 255, 255, 0.05)"
    border="1px solid"
    borderColor="rgba(255, 255, 255, 0.1)"
    borderRadius="xl"
    backdropFilter="blur(10px)"
    boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.15)"
    {...props}
  >
    {children}
  </Box>
);

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Box position="fixed" top={0} left={0} height="100vh" zIndex={0}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 30, density: { enable: false } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.4, opacity_min: 0 } },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              out_mode: "bounce",
              attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
          },
          interactivity: { detect_on: "canvas", events: { resize: true } },
          retina_detect: true
        }}
      />
    </Box>
  );
};

const Header = ({ onAddAccount }) => {
  return (
    <Box
      as="header"
      w="full"
      px={8}
      py={6}
      zIndex={2}
      pos="relative"
      borderBottom="1px solid"
      borderColor="rgba(255,255,255,0.05)"
    >
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={2}>
          <Box w={10} h={10} borderRadius="full" color="white" fontWeight="bold" fontSize="xl" display="flex" alignItems="center" justifyContent="center">
            <LayoutDashboard />
          </Box>
          <VStack align="start" spacing={0}>
            <Text ml={2} fontWeight="bold" fontSize="xl" color="white" textShadow="0 2px 8px #20174D66">alting.to</Text>
            <Text ml={2} fontSize="sm" color="gray.400">Alt Management Dashboard</Text>
          </VStack>
        </Flex>

        <HStack spacing={4}>
          <MotionButton
            bg="rgba(255,255,255,0.1)"
            _hover={{ bg: "rgba(255,255,255,0.2)" }}
            color="white"
            fontWeight="semibold"
            borderRadius="lg"
            leftIcon={<Settings />}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            backdropFilter="blur(5px)"
          >
            Settings
          </MotionButton>

          <MotionButton
            bg="linear-gradient(135deg, #A259FF 0%, #FF5E80 100%)"
            _hover={{ bg: "linear-gradient(135deg, #7E37C9 0%, #E04A6F 100%)" }}
            color="white"
            fontWeight="semibold"
            borderRadius="lg"
            leftIcon={<Plus />}
            shadow="0 4px 15px rgba(162, 89, 255, 0.3)"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddAccount}
          >
            Add Account
          </MotionButton>
        </HStack>
      </Flex>
    </Box>
  );
};

const StatsOverview = ({ accounts }) => {
  const activeAccounts = accounts.filter(acc => acc.status === 'online').length;
  const totalUptime = accounts.reduce((sum, acc) => sum + acc.uptime, 0) / accounts.length || 0;

  return (
    <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
      <GlassCard p={6}>
        <Stat>
          <StatLabel color="gray.300">Total Accounts</StatLabel>
          <StatNumber color="white" fontSize="3xl">{accounts.length}</StatNumber>
          <StatHelpText color="gray.400">
            <Icon as={Users} w={4} h={4} mr={1} />
            Managed alts
          </StatHelpText>
        </Stat>
      </GlassCard>

      <GlassCard p={6}>
        <Stat>
          <StatLabel color="gray.300">Active Now</StatLabel>
          <StatNumber color="#A259FF" fontSize="3xl">{activeAccounts}</StatNumber>
          <StatHelpText color="gray.400">
            <Icon as={Activity} w={4} h={4} mr={1} />
            Online & AFK
          </StatHelpText>
        </Stat>
      </GlassCard>

      <GlassCard p={6}>
        <Stat>
          <StatLabel color="gray.300">Average Uptime</StatLabel>
          <StatNumber color="white" fontSize="3xl">{totalUptime.toFixed(0)}%</StatNumber>
          <StatHelpText color="gray.400">
            <Icon as={Clock} w={4} h={4} mr={1} />
            Last 24h
          </StatHelpText>
        </Stat>
      </GlassCard>

      <GlassCard p={6}>
        <Stat>
          <StatLabel color="gray.300">Plan Status</StatLabel>
          <StatNumber color="#FF5E80" fontSize="xl">Pro Plan</StatNumber>
          <StatHelpText color="gray.400">
            <Icon as={Zap} w={4} h={4} mr={1} />
            50 alts remaining
          </StatHelpText>
        </Stat>
      </GlassCard>
    </SimpleGrid>
  );
};

const AccountCard = ({ account, onToggle, onEdit, onDelete }) => {
  const statusColor = account.status === 'online' ? '#10B981' : account.status === 'offline' ? '#EF4444' : '#F59E0B';
  const statusText = account.status === 'online' ? 'Online' : account.status === 'offline' ? 'Offline' : 'Connecting';

  return (
    <MotionBox whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
      <GlassCard p={6} position="relative" overflow="hidden">
        {/* Status indicator glow */}
        <Box
          position="absolute"
          top="-20px"
          right="-20px"
          w="40px"
          h="40px"
          bg={statusColor}
          filter="blur(20px)"
          opacity={0.3}
          borderRadius="full"
        />

        <Flex justify="space-between" align="start" mb={4}>
          <HStack spacing={3}>
            <Box
              w={12}
              h={12}
              bg="rgba(162, 89, 255, 0.1)"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FaMinecraft} w={6} h={6} color="#A259FF" />
            </Box>
            <VStack align="start" spacing={1}>
              <Text color="white" fontWeight="bold" fontSize="lg">{account.username}</Text>
              <HStack spacing={2}>
                <Badge
                  colorScheme={account.status === 'online' ? 'green' : account.status === 'offline' ? 'red' : 'yellow'}
                  variant="subtle"
                >
                  {statusText}
                </Badge>
                <Text color="gray.400" fontSize="sm">{account.server}</Text>
              </HStack>
            </VStack>
          </HStack>

          <HStack spacing={2}>
            <MotionButton
              size="sm"
              bg="rgba(255,255,255,0.1)"
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
              color="white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(account)}
            >
              <Settings size={16} />
            </MotionButton>
            <MotionButton
              size="sm"
              bg={account.status === 'online' ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)"}
              _hover={{ bg: account.status === 'online' ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)" }}
              color="white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggle(account)}
            >
              {account.status === 'online' ? <Pause size={16} /> : <Play size={16} />}
            </MotionButton>
          </HStack>
        </Flex>

        <VStack spacing={3} align="stretch">
          <Box>
            <HStack justify="space-between" mb={1}>
              <Text color="gray.300" fontSize="sm">Uptime</Text>
              <Text color="white" fontSize="sm">{account.uptime}%</Text>
            </HStack>
            <Progress
              value={account.uptime}
              bg="rgba(255,255,255,0.1)"
              borderRadius="full"
              size="sm"
              colorScheme="purple"
            />
          </Box>

          <Grid templateColumns="1fr 1fr" gap={4}>
            <VStack align="start" spacing={1}>
              <Text color="gray.400" fontSize="xs">AFK Mode</Text>
              <Text color="white" fontSize="sm">{account.afkMode}</Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text color="gray.400" fontSize="xs">Runtime</Text>
              <Text color="white" fontSize="sm">{account.runtime}</Text>
            </VStack>
          </Grid>

          <HStack justify="space-between" pt={2} borderTop="1px solid" borderColor="rgba(255,255,255,0.1)">
            <HStack spacing={2}>
              <Icon as={Globe} w={4} h={4} color="gray.400" />
              <Text color="gray.400" fontSize="xs">Region: {account.region}</Text>
            </HStack>
            <MotionButton
              size="xs"
              variant="ghost"
              color="red.400"
              _hover={{ color: "red.300", bg: "rgba(239, 68, 68, 0.1)" }}
              onClick={() => onDelete(account)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 size={14} />
            </MotionButton>
          </HStack>
        </VStack>
      </GlassCard>
    </MotionBox>
  );
};

export default function App() {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      username: "AltAccount_01",
      status: "online",
      server: "Hypixel",
      uptime: 98.5,
      afkMode: "Fishing",
      runtime: "2d 14h",
      region: "US-East"
    },
    {
      id: 2,
      username: "AltAccount_02",
      status: "online",
      server: "2b2t",
      uptime: 95.2,
      afkMode: "Mining",
      runtime: "1d 8h",
      region: "EU-West"
    },
    {
      id: 3,
      username: "AltAccount_03",
      status: "offline",
      server: "Mineplex",
      uptime: 87.1,
      afkMode: "Idle",
      runtime: "0d 0h",
      region: "US-West"
    }
  ]);
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    server: "",
    afkMode: "Idle",
    region: "US-East"
  });
  const toast = useToast();

  const bg = `radial-gradient(circle at 20% 0%,
    rgba(20, 5, 40, 0.2) 0%,
    rgba(18, 5, 36, 0.25) 15%,
    rgba(16, 5, 32, 0.3) 30%,
    rgba(14, 4, 28, 0.4) 45%,
    rgba(12, 3, 24, 0.5) 60%,
    rgba(8, 2, 16, 0.7) 75%,
    rgba(4, 1, 8, 0.9) 90%,
    rgba(0, 0, 0, 1) 100%)`;

  const handleAddAccount = (e) => {
    e.preventDefault();
    const account = {
      id: accounts.length + 1,
      ...newAccount,
      status: "offline",
      uptime: 0,
      runtime: "0d 0h"
    };
    setAccounts([...accounts, account]);
    setNewAccount({ username: "", password: "", server: "", afkMode: "Idle", region: "US-East" });
    onAddClose();
    toast({
      title: "Account added successfully!",
      description: `${account.username} has been added to your dashboard.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleToggleAccount = (account) => {
    setAccounts(accounts.map(acc => 
      acc.id === account.id 
        ? { ...acc, status: acc.status === 'online' ? 'offline' : 'online' }
        : acc
    ));
    toast({
      title: `Account ${account.status === 'online' ? 'stopped' : 'started'}`,
      description: `${account.username} is now ${account.status === 'online' ? 'offline' : 'online'}.`,
      status: account.status === 'online' ? 'warning' : 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditAccount = () => {
    // Edit functionality would go here
  };

  const handleDeleteAccount = (account) => {
    setAccounts(accounts.filter(acc => acc.id !== account.id));
    toast({
      title: "Account removed",
      description: `${account.username} has been removed from your dashboard.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="100vw" overflowX="hidden">
      <Box minH="100vh" w="100vw" pos="relative" overflow="hidden" bg="#0c0613" style={{ background: bg }}>
        <ParticlesBackground />

        {/* Animated waves */}
        <WavePattern top={0} left={0} color="rgba(162, 89, 255, 0.1)" />
        <WavePattern bottom={0} left={0} transform="rotate(180deg)" color="rgba(255, 94, 128, 0.1)" />

        {/* Floating Hexagons */}
        <FloatingHexagon size={150} color="#b983ff" initialX={-50} initialY={100} duration={25} opacity={0.05} />
        <FloatingHexagon size={120} color="#b983ff" initialX={300} initialY={200} duration={30} delay={3} opacity={0.04} />
        <FloatingHexagon size={100} color="#b983ff" initialX={200} initialY={300} duration={20} delay={1} opacity={0.03} />

        <Flex direction="column" minH="100vh" pos="relative" zIndex={1}>
          <Header onAddAccount={onAddOpen} />
          
          <Container maxW="7xl" flex={1} py={8}>
            <VStack spacing={8} align="stretch">
              {/* Welcome Section */}
              <Box>
                <Heading color="white" fontSize="3xl" mb={2}>
                  Welcome back! 
                </Heading>
                <Text color="gray.300" fontSize="lg">
                  Manage your Minecraft alt accounts with ease. Your alts are running 24/7 so you don't have to.
                </Text>
              </Box>

              {/* Stats Overview */}
              <StatsOverview accounts={accounts} />

              {/* Accounts Grid */}
              <Box>
                <Flex justify="space-between" align="center" mb={6}>
                  <Heading color="white" fontSize="xl">Your Alt Accounts</Heading>
                  <Tag colorScheme="purple" size="lg" px={4} py={1} backdropFilter="blur(5px)" bg="rgba(162, 89, 255, 0.2)">
                    {accounts.length} / 50 accounts
                  </Tag>
                </Flex>

                {accounts.length === 0 ? (
                  <GlassCard p={12} textAlign="center">
                    <VStack spacing={4}>
                      <Icon as={FaMinecraft} w={12} h={12} color="gray.500" />
                      <Heading color="gray.400" fontSize="xl">No accounts yet</Heading>
                      <Text color="gray.500">Add your first Minecraft alt to get started</Text>
                      <MotionButton
                        bg="linear-gradient(135deg, #A259FF 0%, #FF5E80 100%)"
                        _hover={{ bg: "linear-gradient(135deg, #7E37C9 0%, #E04A6F 100%)" }}
                        color="white"
                        leftIcon={<Plus />}
                        onClick={onAddOpen}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add Your First Account
                      </MotionButton>
                    </VStack>
                  </GlassCard>
                ) : (
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {accounts.map((account) => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        onToggle={handleToggleAccount}
                        onEdit={handleEditAccount}
                        onDelete={handleDeleteAccount}
                      />
                    ))}
                  </SimpleGrid>
                )}
              </Box>
            </VStack>
          </Container>
        </Flex>

        {/* Add Account Modal */}
        <Modal isOpen={isAddOpen} onClose={onAddClose} isCentered size="lg">
          <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
          <ModalContent bg="rgba(16, 10, 30, 0.9)" border="1px solid" borderColor="rgba(255, 255,255,0.1)" backdropFilter="blur(16px)">
            <ModalHeader color="white">Add New Alt Account</ModalHeader>
            <ModalCloseButton color="white" />
            <form onSubmit={handleAddAccount}>
              <ModalBody pb={6}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel color="gray.300">Username</FormLabel>
                    <Input
                      placeholder="MinecraftUsername"
                      value={newAccount.username}
                      onChange={(e) => setNewAccount({...newAccount, username: e.target.value})}
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid rgba(255,255,255,0.1)"
                      color="white"
                      _placeholder={{ color: "gray.500" }}
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel color="gray.300">Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={newAccount.password}
                      onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid rgba(255,255,255,0.1)"
                      color="white"
                      _placeholder={{ color: "gray.500" }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="gray.300">Preferred Server</FormLabel>
                    <Input
                      placeholder="e.g. Hypixel, 2b2t, play.server.com"
                      value={newAccount.server}
                      onChange={(e) => setNewAccount({...newAccount, server: e.target.value})}
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid rgba(255,255,255,0.1)"
                      color="white"
                      _placeholder={{ color: "gray.500" }}
                    />
                  </FormControl>

                  <Grid templateColumns="1fr 1fr" gap={4} w="full">
                    <FormControl>
                      <FormLabel color="gray.300">AFK Mode</FormLabel>
                      <Select
                        value={newAccount.afkMode}
                        onChange={(e) => setNewAccount({...newAccount, afkMode: e.target.value})}
                        bg="rgba(255,255,255,0.05)"
                        border="1px solid rgba(255,255,255,0.1)"
                        color="white"
                      >
                        <option value="Idle" style={{backgroundColor: '#1a1a1a'}}>Idle</option>
                        <option value="Fishing" style={{backgroundColor: '#1a1a1a'}}>Fishing</option>
                        <option value="Mining" style={{backgroundColor: '#1a1a1a'}}>Mining</option>
                        <option value="Farming" style={{backgroundColor: '#1a1a1a'}}>Farming</option>
                        <option value="Combat" style={{backgroundColor: '#1a1a1a'}}>Combat</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel color="gray.300">Region</FormLabel>
                      <Select
                        value={newAccount.region}
                        onChange={(e) => setNewAccount({...newAccount, region: e.target.value})}
                        bg="rgba(255,255,255,0.05)"
                        border="1px solid rgba(255,255,255,0.1)"
                        color="white"
                      >
                        <option value="US-East" style={{backgroundColor: '#1a1a1a'}}>US East</option>
                        <option value="US-West" style={{backgroundColor: '#1a1a1a'}}>US West</option>
                        <option value="EU-West" style={{backgroundColor: '#1a1a1a'}}>EU West</option>
                        <option value="Asia-Pacific" style={{backgroundColor: '#1a1a1a'}}>Asia Pacific</option>
                      </Select>
                    </FormControl>
                  </Grid>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  bg="linear-gradient(135deg, #A259FF 0%, #FF5E80 100%)"
                  _hover={{ bg: "linear-gradient(135deg, #7E37C9 0%, #E04A6F 100%)" }}
                  color="white"
                  mr={3}
                >
                  Add Account
                </Button>
                <Button onClick={onAddClose} variant="ghost" color="gray.300">
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}