/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AppBar, Toolbar, Typography, Button, styled, Box, Avatar, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import { WhiteButton } from './buttons/WhiteNavButton';
import { TransparentNavButton } from './buttons/TransparentNavButton';
import { useState, useEffect } from 'react';
import { scrollToElement } from '../utils/scroll';

// Enhanced AppBar with scroll behavior
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
    boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
    background: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'none',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    marginTop: scrolled ? '0px' : '20px',
    transition: 'all 0.3s ease',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
}));

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Handle scroll events for navbar appearance and active section
    useEffect(() => {
        const handleScroll = () => {
            // Update navbar appearance on scroll
            const isScrolled = window.scrollY > 100;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }

            // Update active section based on scroll position
            const sections = ['about', 'experience', 'projects', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navItems = [
        { label: 'About Me', target: 'about' },
        { label: 'Experience', target: 'experience' },
        { label: 'Projects', target: 'projects' },
        { label: 'Resume', url: 'https://rxresu.me/ahmadgillwebdev/muhammad-ahmad-mern-stack', isExternal: true },
        { label: 'Contact', target: 'contact', isWhite: true },
    ];

    // Enhanced TransparentNavButton with active state
    const EnhancedTransparentNavButton = ({ target, label, onClick }) => {
        const isActive = activeSection === target;

        return (
            <TransparentNavButton
                Title={label}
                onClick={onClick}
            />
        );
    };

    return (
        <StyledAppBar position="sticky" scrolled={scrolled}>
            <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    }
                }}>
                    <img
                        src="/LogoWithName.png"
                        alt="Portfolio logo"
                        style={{
                            display: { xs: 'none', md: 'block' },
                            height: '80px',
                            transition: 'filter 0.3s ease',
                            filter: scrolled ? 'drop-shadow(0 0 5px rgba(156,131,255,0.5))' : 'none'
                        }}
                    />
                </Box>

                {/* Desktop Navigation */}
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    gap: 2,
                    alignItems: 'center'
                }}>
                    {navItems.slice(0, -1).map((item) => (
                        item.isExternal ? (
                            <TransparentNavButton
                                key={item.label}
                                Title={item.label}
                                onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                            />
                        ) : (
                            <EnhancedTransparentNavButton
                                key={item.target}
                                target={item.target}
                                label={item.label}
                                onClick={() => scrollToElement(item.target, 100)}
                            />
                        )
                    ))}
                    <WhiteButton
                        onClick={() => scrollToElement('contact', 100)}
                        Title="Contact"
                        sx={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    />
                </Box>

                {/* Mobile Menu Button */}
                <IconButton
                    color="inherit"
                    aria-label="open menu"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        p: 1.5,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'rotate(90deg)'
                        }
                    }}
                >
                    <MenuIcon fontSize="large" />
                </IconButton>

                {/* Mobile Drawer */}
                <Drawer
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    PaperProps={{
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            backdropFilter: 'blur(10px)',
                            width: '50%',
                            p: 3
                        }
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        mt: 4,
                        alignItems: 'center'
                    }}>
                        {navItems.map((item) => (
                            item.isWhite ? (
                                <WhiteButton
                                    key={item.target}
                                    Title={item.label}
                                    onClick={() => {
                                        handleDrawerToggle();
                                        scrollToElement(item.target, 100);
                                    }}
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                />
                            ) : (
                                <TransparentNavButton
                                    key={item.target || item.label}
                                    Title={item.label}
                                    onClick={() => {
                                        handleDrawerToggle();
                                        if (item.isExternal) {
                                            window.open(item.url, '_blank', 'noopener,noreferrer');
                                        } else {
                                            scrollToElement(item.target, 100);
                                        }
                                    }}
                                />
                            )
                        ))}
                    </Box>
                </Drawer>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;