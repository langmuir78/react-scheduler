import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useWindowResize } from "../../hooks/useWindowResize";
import { DefaultRecourse } from "../../types";
import useStore from "../../hooks/useStore";

interface ResourceHeaderProps {
  resource: DefaultRecourse;
}
const ResourceHeader = ({ resource }: ResourceHeaderProps) => {
  const { resourceHeaderComponent, resourceFields, resources, direction, resourceViewMode } =
    useStore();
  const { width } = useWindowResize();
  const theme = useTheme();

  const text = resource[resourceFields.textField];
  const subtext = resource[resourceFields.subTextField || ""];
  const avatar = resource[resourceFields.avatarField || ""];
  const color = resource[resourceFields.colorField || ""];

  if (resourceHeaderComponent instanceof Function) {
    return resourceHeaderComponent(resource);
  }

  const headerBorders =
    resourceViewMode === "tabs"
      ? {}
      : {
          borderColor: theme.palette.grey[300],
          borderStyle: "solid",
          borderWidth: "1px 1px 0 1px",
        };
  return (
    <ListItem
      sx={{
        padding: "2px 10px",
        textAlign: direction === "rtl" ? "right" : "left",
        ...headerBorders,
      }}
      component="span"
    >
      <ListItemAvatar>
        <Avatar style={{ background: color }} alt={text} src={avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2" noWrap>
            {text}
          </Typography>
        }
        secondary={
          <Typography variant="caption" color="textSecondary" noWrap>
            {subtext}
          </Typography>
        }
        style={{ width: width / (resources.length + 1) }}
      />
    </ListItem>
  );
};

export { ResourceHeader };
