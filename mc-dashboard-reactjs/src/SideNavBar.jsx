import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import { Badge, Typography, Stack, Divider, Box, Avatar } from '@mui/material';
import { deepOrange, green, yellow, grey } from '@mui/material/colors';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
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
    'Online': green[600],
    'Away': yellow[600],
    'Offline': grey[600]
  }

  const players_list = [
    {
      uuid: 'cb7ba569-f33b-41b5-a3c1-63bc2534d112',
      username: 'yvonn1e',
      status: 'Away'
    },
    {
      uuid: 'cb7ba569-f33b-41b5-a3c1-63bc2534d112',
      username: 'jaggpegg',
      status: 'Online'
    },
    {
      uuid: 'cb7ba569-f33b-41b5-a3c1-63bc2534d112',
      username: 'sammy',
      status: 'Offline'
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
          height: '5vh',
        }}
      >
      <Badge color="primary" badgeContent={players_list.length} max={999}>
        <Typography variant="h5">
          PLAYERS
        </Typography>
      </Badge>
      </Box>
      <Divider />
      {players_list.map((player) => {
        return (
          <Stack
            direction="row"
            sx={{
              p: 2,
              gap: 1,
              alignItems: 'center',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
            N
            </Avatar>
            <Box sx={{ mr: 'auto' }}>
              <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                {player.username}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: status_colors[player.status],
                  }}
                />
                <Typography variant="body2">{player.status}</Typography>
              </Stack>
            </Box>
          </Stack>
        )
      })}
    </Drawer>
  );
}