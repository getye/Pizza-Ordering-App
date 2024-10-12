const { ListItem, ListItemButton, ListItemText } = require("@mui/material");
const { useNavigate } = require("react-router-dom");

export const TestButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Clicked Reports");
        alert("Clicked Reports");
        navigate("admin/reports");
    };

    return (
        <ListItem disablePadding onClick={handleClick}>
            <ListItemButton>
                <ListItemText primary="Test Reports" />
            </ListItemButton>
        </ListItem>
    );
};