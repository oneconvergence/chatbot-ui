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
      <div className="absolute right-0 z-50 p-4 rounded bg-white shadow-custom border transition-all w-max-content h-max-content">
      <div className="grid grid-cols-2 gap-2 items-center">
          <div className='inline-flex items-center'>
            <label className=" text-sm font-medium text-zinc-700">{label}</label>
            <div className="group">
                  <button
                    className="ml-1 mt-2 text-sm text-gray-500  dark:text-white rounded-full focus:outline-none">
                    <IconInfoCircle size={18}/>
                  </button>
                  <span className="absolute right-10 bottom-1 z-10 scale-0 transition-all border p-2 group-hover:scale-100 whitespace-nowrap text-sm text-zinc-700 rounded bg-white border shadow transition-all w-max-content h-max-content">Lower value gives less random text</span>
                 </div>
          </div>
          <input
            id="maximumLength"
            className="absolute right-3 py-0 px-1 text-left border border-transparent w-[64px] font-medium text-zinc-700 text-sm tracking-tight rounded focus:outline-none focus:ring-0 hover:border-zinc-200 focus:border-zinc-400 font-mono"
            min={0}
            max={1}
            step={0.1}
            type="number"
            value={temperature}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center mt-1">
          <input
            className="flex-grow cursor-pointer appearance-none w-full h-1 rounded-md focus:outline-none ring ring-gray-300 ring-1"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={(event) => handleChange(event)}
            style={{
              background: `linear-gradient(to right, black 0%, black ${temperature * 100}%, #D1D5DB ${temperature * 100}%, #D1D5DB 100%)`,
            }}
          />
        </div>
      </div>
      
    </div>
  );
};
