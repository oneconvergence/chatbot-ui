import {createContext, useContext, useEffect, useState} from 'react';

import Home from './home';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { GetServerSideProps } from 'next';
import { OpenAIModelID, fallbackModelID } from '@/types/openai';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export interface Props {
    serverSideApiKeyIsSet: boolean;
    serverSidePluginKeysSet: boolean;
    defaultModelId: OpenAIModelID;
  }
  // Define the type for your shared input text and sync chat submit function
type SharedInputText = string;

type SyncChatSubmit = () => void;

// Create the interface for the context value
interface MultiChatContextValue {
  sharedInputText: SharedInputText;
  updateSharedInputText: (text: SharedInputText) => void;
  syncChatSubmit: boolean;
  updateSyncChatSubmit: (submitFunction: boolean) => void;
}

// Create a default context value
const defaultMultiChatContextValue: MultiChatContextValue = {
  sharedInputText: '',
  updateSharedInputText: () => {},
  syncChatSubmit: false,
  updateSyncChatSubmit: () => {},
};

const MultiChatContext = createContext(defaultMultiChatContextValue);

const MultiChat = ({
  serverSideApiKeyIsSet,
  serverSidePluginKeysSet,
  defaultModelId,
}: Props) => {
  const [chats, setChats] = useState<string[]>([]);
  const [sharedInputText, setSharedInputText] = useState('');
  const [syncChatSubmit, setSyncChatSubmit] = useState(false);

  const updateSharedInputText = (text:string) => {
    setSharedInputText(text);
  };

  const  updateSyncChatSubmit = (syncSubmit:boolean) => {
    setSyncChatSubmit(syncSubmit)
  }

  useEffect(() => {
    // Function to handle updates when localStorage is changed
    const handleLocalStorageUpdate = () => {
      // Retrieve the updated data from localStorage
      const chatIds = localStorage.getItem('chats') 
      const chats : string[]= chatIds?JSON.parse(chatIds):[]
      let myChats:string[]=[]; 
      if(chats && chats.length){
        myChats = chats 
      }
        else {
          myChats = [uuidv4(),uuidv4()]
          localStorage.setItem('chats', JSON.stringify(myChats))
        }
      setChats(myChats)
    };
    handleLocalStorageUpdate()
    // Listen for the custom event and call the handler function
    window.addEventListener('newChat', handleLocalStorageUpdate);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('newChat', handleLocalStorageUpdate);
    };
  }, []);

  return (
  <MultiChatContext.Provider
      value={{ sharedInputText, updateSharedInputText,syncChatSubmit,updateSyncChatSubmit }}
    >
    <div className="sticky top-0 z-10 flex  border-b-[1px] bg-white h-[56px] border-b-neutral-300 bg-neutral-100 pl-2 ">
    <Image src="/dkube.png" alt="AI" width={40} height={36} className="my-auto"/>
    <span className="my-auto font-bold lg:text-lg pl-2">AI Playground</span>
    </div>
    <div className="flex h-[calc(100vh-56px)] w-full sm:pt-0  divide-x">
      {chats.map((chat) => (
        <Home key={chat} serverSideApiKeyIsSet={serverSideApiKeyIsSet} serverSidePluginKeysSet={serverSidePluginKeysSet} defaultModelId={defaultModelId} chatId={chat}/>
      ))}
    </div>
    </MultiChatContext.Provider>
  );
};

export default MultiChat;

export function useMultiChatContext() {
  return useContext(MultiChatContext);
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const defaultModelId =
    (process.env.DEFAULT_MODEL &&
      Object.values(OpenAIModelID).includes(
        process.env.DEFAULT_MODEL as OpenAIModelID,
      ) &&
      process.env.DEFAULT_MODEL) ||
    fallbackModelID;

  let serverSidePluginKeysSet = false;

  const googleApiKey = process.env.GOOGLE_API_KEY;
  const googleCSEId = process.env.GOOGLE_CSE_ID;

  if (googleApiKey && googleCSEId) {
    serverSidePluginKeysSet = true;
  }
  return {
    props: {
      serverSideApiKeyIsSet: !!process.env.OPENAI_API_KEY,
      defaultModelId,
      serverSidePluginKeysSet,
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'chat',
        'sidebar',
        'markdown',
        'promptbar',
        'settings',
      ])),
    },
  };
};
