import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

interface Props {
	focuslength: number;
}
const pages = ['ToDo', 'Tracker', 'Tells'];
const settings = ['Github', 'Linkedin'];
const linkedin = 'https://www.linkedin.com/in/branyzp/';
const github = 'https://github.com/branyzp';

const NavBar = ({ focuslength }: Props) => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event: any) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: any) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar
			style={{ background: 'rgba(255, 255, 255, 0.1)' }}
			position="static"
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Button component={Link} to="/">
						<img
							className="icon"
							src="https://i.imgur.com/0ySjdzs.png"
							alt="logo"
						/>
					</Button>
					{/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Producthief
          </Typography> */}

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page}
									onClick={handleCloseNavMenu}
									component={Link}
									to={`${page}`}
								>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					{/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Producthiev
          </Typography> */}
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								component={Link}
								to={`${page}`}
								sx={{
									my: 2,
									color: 'white',
									display: 'block',
									fontFamily: 'Oxygen',
								}}
							>
								{page}
							</Button>
						))}
					</Box>
					{/* <Box sx={{ flexGrow: 25 }}>
						<Button
							sx={{
								my: 2,
								color: 'white',
								display: 'block',
								fontFamily: 'Oxygen',
							}}
						>
							Total Focuses: {focuslength}
						</Button>
					</Box> */}

					<Box sx={{ flexGrow: 0 }}>
						<Button
							sx={{
								my: 2,
								color: 'white',
								display: 'inline-block',
								fontFamily: 'Oxygen',
							}}
							component={Link}
							to={'/login'}
						>
							Login
						</Button>

						<Button
							sx={{
								my: 2,
								color: 'white',
								display: 'inline-block',
								fontFamily: 'Oxygen',
							}}
							component={Link}
							to={'/register'}
						>
							Register
						</Button>

						<Tooltip title="Check out my profile!">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt="Remy Sharp"
									src="https://i.imgur.com/p3FqVsz.png"
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseUserMenu}>
								<a href={github}>
									<Typography textAlign="center">GitHub</Typography>
								</a>
							</MenuItem>
							<MenuItem onClick={handleCloseUserMenu}>
								<a href={linkedin}>
									<Typography textAlign="center">Linkedin</Typography>
								</a>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default NavBar;
