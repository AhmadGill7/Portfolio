/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AppBar, Toolbar, Typography, Button, styled, Box, Drawer, IconButton, Dialog, DialogContent, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
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
    const [resumeOpen, setResumeOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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

    const handleResumeOpen = () => {
        setResumeOpen(true);
    };

    const handleResumeClose = () => {
        setResumeOpen(false);
    };

    const navItems = [
        { label: 'About Me', target: 'about' },
        { label: 'Experience', target: 'experience' },
        { label: 'Projects', target: 'projects' },
        { label: 'Resume', isResume: true },
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
        <>
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
                            item.isResume ? (
                                <TransparentNavButton
                                    key={item.label}
                                    Title={item.label}
                                    onClick={handleResumeOpen}
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
                                ) : item.isResume ? (
                                    <TransparentNavButton
                                        key={item.label}
                                        Title={item.label}
                                        onClick={() => {
                                            handleDrawerToggle();
                                            handleResumeOpen();
                                        }}
                                    />
                                ) : (
                                    <TransparentNavButton
                                        key={item.target || item.label}
                                        Title={item.label}
                                        onClick={() => {
                                            handleDrawerToggle();
                                            scrollToElement(item.target, 100);
                                        }}
                                    />
                                )
                            ))}
                        </Box>
                    </Drawer>
                </Toolbar>
            </StyledAppBar>

            {/* Resume Dialog */}
            <Dialog
                open={resumeOpen}
                onClose={handleResumeClose}
                fullScreen={fullScreen}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: '#080808',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: { xs: 0, sm: '16px' },
                        height: fullScreen ? '100vh' : '90vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }
                }}
                slotProps={{
                    backdrop: {
                        sx: { backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.75)' }
                    }
                }}
            >
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: { xs: 2.5, sm: 3.5 },
                    py: 2,
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                }}>
                    <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, letterSpacing: '0.02em', fontSize: { xs: '1rem', sm: '1.15rem' } }}>
                        Muhammad Ahmad — Résumé
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            component="a"
                            href="/Muhammad Ahmad Resume.pdf"
                            download
                            startIcon={<FileDownloadIcon />}
                            variant="outlined"
                            size="small"
                            sx={{
                                color: '#ffffff',
                                borderColor: 'rgba(255,255,255,0.22)',
                                borderRadius: '10px',
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.82rem',
                                px: 2,
                                display: { xs: 'none', sm: 'flex' },
                                '&:hover': {
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    backgroundColor: 'rgba(255,255,255,0.06)',
                                }
                            }}
                        >
                            Download
                        </Button>
                        <IconButton
                            onClick={handleResumeClose}
                            size="small"
                            sx={{
                                color: 'rgba(255,255,255,0.6)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                width: 36,
                                height: 36,
                                '&:hover': {
                                    color: '#ffffff',
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                    borderColor: 'rgba(255,255,255,0.3)',
                                }
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                {/* PDF Viewer */}
                <DialogContent sx={{ p: { xs: 1.5, sm: 2.5 }, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <Box sx={{
                        flex: 1,
                        width: '100%',
                        minHeight: 0,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.07)',
                        bgcolor: '#111111',
                    }}>
                        <iframe
                            title="Resume"
                            src="/Muhammad Ahmad Resume.pdf#view=FitH"
                            width="100%"
                            height="100%"
                            style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
                        />
                    </Box>
                    {/* Mobile download button */}
                    <Button
                        component="a"
                        href="/Muhammad Ahmad Resume.pdf"
                        download
                        startIcon={<FileDownloadIcon />}
                        variant="outlined"
                        fullWidth
                        sx={{
                            display: { xs: 'flex', sm: 'none' },
                            mt: 2,
                            color: '#ffffff',
                            borderColor: 'rgba(255,255,255,0.22)',
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 500,
                            '&:hover': {
                                borderColor: 'rgba(255,255,255,0.5)',
                                backgroundColor: 'rgba(255,255,255,0.06)',
                            }
                        }}
                    >
                        Download PDF
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Navbar;