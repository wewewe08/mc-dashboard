import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import { Badge, Typography, Stack, Divider, Box, Avatar, Button } from '@mui/material';
import { green, orange, grey } from '@mui/material/colors';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  marginTop: '10px', 
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideNavBar() {
  async function getMinecraftUsername(uuid) {
    const response = await fetch(`https://api.mojang.com/user/profiles/${uuid.replace(/-/g, '')}/names`);
    if (!response.ok) {
      throw new Error('Failed to fetch username');
    }
    const data = await response.json();
    return data
  }

  const status_colors = {
    'ONLINE': green[600],
    'AWAY': orange[600],
    'OFFLINE': grey[600]
  }

  const players_list = [
    {
      uuid: 'cb7ba569-f33b-41b5-a3c1-63bc2534d112',
      username: 'yvonn1e',
      status: 'ONLINE'
    },
    {
      uuid: 'ba46aeae-2d4e-4001-8e3f-a7f6696de3a8',
      username: 'jaggpegg',
      status: 'AWAY'
    },
    {
      uuid: 'e6847d7d-9a4a-4b40-8ecc-627ef9398907',
      username: 'ToughAgent',
      status: 'OFFLINE'
    },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '7vh',
          marginBottom: -2
        }}
      >
      <Typography variant="h5" style={{ fontFamily: 'Minecraftia', paddingRight: '1rem' }}>
        PLAYERS
          <Badge 
          color="primary" 
          badgeContent={players_list.length} 
          max={999}
          style={{  transform: 'translate(1.2rem, -1.2rem)'}}
        />
      </Typography>
      </Box>
      <Divider />
      {players_list.map((player) => {
        return (
          <Button
            key={player.uuid}
            sx={{
              p: 0,
              textAlign: 'left',
              width: '100%', 
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
              '&:focus': {
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
              },
              textTransform: 'none'
            }}
            onClick={() => {
              console.log('Player clicked:', player.username)
            }}
          >
            <Stack
              direction="row"
              sx={{
                p: 2,
                gap: 1,
                alignItems: 'center',
                borderTop: '1px solid',
                borderColor: 'divider',
                width:1
              }}
            >
              <Avatar variant="square" src={`https://mc-heads.net/avatar/${player.uuid}`} />
              <Box sx={{ mr: 'auto' }}>
                <Typography variant="body2" sx={{ fontFamily: 'Minecraftia', fontWeight: 500, lineHeight: '16px', color: 'text.primary', marginTop: '1rem'}}>
                  {player.username}
                </Typography>
                <Stack direction='row' spacing={1}>
                  <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: status_colors[player.status],
                      }}
                    />
                  <Typography variant="body2" sx={{ fontFamily: 'Minecraftia', color: status_colors[player.status]}}>{player.status}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Button>
        );
      })}
    </Drawer>
  );
}