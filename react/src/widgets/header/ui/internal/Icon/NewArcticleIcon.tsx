import { IconLink } from "@/shared/ui/IconLink/IconLink";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NewArcticleIcon = () => {
  return (
    <IconLink
      to="/new-article"
      icon={<FontAwesomeIcon icon={faNewspaper} />}
      className="new-article"
    />
  );
};
