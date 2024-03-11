interface IConfigurationNavProps {
  configurationList: string[];
  activeConfiguration: number;
  handleActiveConfiguration: (index: number) => void;
}

const ConfigurationNav = ({
  configurationList,
  activeConfiguration,
  handleActiveConfiguration,
}: IConfigurationNavProps) => {
  return (
    <nav className="p-2">
      <ul>
        {configurationList &&
          configurationList.map((item, index) => (
            <li
              key={index}
              className={`link hover:cursor-pointer h-14 flex items-center px-4 rounded-md ${
                index === activeConfiguration && 'bg-background border-r-4 border-r-accent'
              }`}
              onClick={() => handleActiveConfiguration(index)}
            >
              {item}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default ConfigurationNav;
