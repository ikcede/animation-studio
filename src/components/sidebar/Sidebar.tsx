import React from 'react';
import styling from './Sidebar.module.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GetAppIcon from '@mui/icons-material/GetApp';
import CodeIcon from '@mui/icons-material/Code';
import SidebarKeyframes from './SidebarKeyframes';
import SidebarExport from './SidebarExport';
import SidebarAnimation from './SidebarAnimation';
import SidebarTarget from './SidebarTarget';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className={styling['custom-panel']}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Sidebar: React.FC = ({}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={styling.wrapper}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Sidebar tabs"
          sx={{ paddingLeft: '8px', paddingRight: '8px' }}
        >
          <Tab
            icon={<BookmarksIcon />}
            label="Keyframes"
            {...a11yProps(0)}
          />
          <Tab
            icon={<PlayCircleIcon />}
            label="Animation"
            {...a11yProps(1)}
          />
          <Tab icon={<CodeIcon />} label="Target" {...a11yProps(2)} />
          <Tab icon={<GetAppIcon />} label="Export" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <div className={styling.panel}>
        <CustomTabPanel value={value} index={0}>
          <SidebarKeyframes />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SidebarAnimation></SidebarAnimation>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SidebarTarget></SidebarTarget>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <SidebarExport></SidebarExport>
        </CustomTabPanel>
      </div>
    </Box>
  );
};

export default Sidebar;
