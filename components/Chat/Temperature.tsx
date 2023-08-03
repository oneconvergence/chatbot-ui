import { FC, useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { IconFileInfo, IconInfoCircleFilled } from '@tabler/icons-react';

import { DEFAULT_TEMPERATURE } from '@/utils/app/const';

import HomeContext from '@/pages/api/home/home.context';
import { IconInfoCircle } from '@tabler/icons-react';

interface Props {
  label: string;
  onChangeTemperature: (temperature: number) => void;
}

export const TemperatureSlider: FC<Props> = ({
  label,
  onChangeTemperature,
}) => {
  const {
    state: { conversations },
  } = useContext(HomeContext);
  const lastConversation = conversations[conversations.length - 1];
  const [temperature, setTemperature] = useState(
    lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
  );
  const { t } = useTranslation('chat');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setTemperature(newValue);
    onChangeTemperature(newValue);
  };
  const [showInfo, setShowInfo] = useState(false);

  const handleinfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className="relative">
      <div className="absolute top-13 right-0 z-50 p-4 rounded bg-white shadow-custom border transition-all w-max-content h-max-content">
      <div className="grid grid-cols-2 gap-2 items-center">
          <div>
            <label className="inline-flex items-center text-sm font-medium text-zinc-700">{label}</label>
            <button
            className="absolute ml-1 text-sm text-gray-500  dark:text-white rounded-full focus:outline-none"
            onClick={handleinfo}
          >
            <IconInfoCircle size={18}/>
          </button>
          </div>
          <span className="text-right text-sm text-neutral-900 dark:text-neutral-100">
            {temperature.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center mt-2">
          <input
            className="flex-grow cursor-pointer"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={handleChange}
          />
        </div>
      </div>
      
    </div>
  );
};
