import { Avatar, Box } from "@mui/material";

interface PlayerRoleProps {
  role: string;
  secondary?: string;
  small: boolean;
}

const getRoleImage = (role: string) => {
    if (role == "Flex") return "/roles/Flex.webp";
    return `/roles/${role}.webp`};

export const PlayerRole = ({ role, secondary, small }: PlayerRoleProps) => {
  if (typeof role !== "string") return null;

  var width; 
  var height; 
  if (!small)
    {   
        width = 50;
        height = 50;
    }
    else
    {
        width = 20;
        height = 20;
    }

  const remainingRoles = ["Damage", "Tank", "Support"].filter(
    (r) => r.toLowerCase() !== role.toLowerCase()
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    <Box sx={{ position: "relative", width: 50, height: 50 }}>
      <Avatar
        variant="square"
        src={getRoleImage(role)}
        sx={{ width, height }}
      />

      {/* One secondary role */}
      {(secondary && secondary != "None") &&
        secondary.toLowerCase() !== "both" && (
          <Avatar
            variant="square"
            src={getRoleImage(secondary)}
            sx={{
              position: "absolute",
              width: width / 2,
              height: height / 2,
              top: 0,
              left: width/1.5,
            }}
          />
        )}

      {/* Both remaining roles */}
      {secondary?.toLowerCase() === "both" && (
        <>
          <Avatar
            variant="square"
            src={getRoleImage(remainingRoles[0])}
            sx={{
              position: "absolute",
              width: width / 2, height: height / 2,top: 0, left: width/1.5,
            }}
          />
          <Avatar
            variant="square"
            src={getRoleImage(remainingRoles[1])}
            sx={{
              position: "absolute",
              width: width / 2,
              height: height / 2,
              top: height / 2,
              left: width/1.5,
            }}
          />
        </>
      )}
    </Box>
    </Box>
  );
};