import React, { useEffect, useState } from 'react';
import { Telegraf } from 'telegraf';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const token = `7177162493:AAFxq4PukFzNdj2J1L0rGnMx-PTAGzuetBk`
const bot = new Telegraf(token);

const App: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    bot.start((ctx) => {
      setUser(ctx.message.from);
      fetchHoroscope(ctx.message.from.language_code);
    });

    bot.launch();

    return () => {
      bot.stop();
    };
  }, []);

  const fetchHoroscope = async () => {
    try {
      const response = await fetch(
        `https://poker247tech.ru/get_horoscope/`
      );
      const data = await response.json();
      setHoroscope(data);
    } catch (error) {
      console.error('Error fetching horoscope:', error);
    }
  };

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    fetchHoroscope(lng);
  };

  if (!user || !horoscope) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{t('greeting', { name: user.first_name })}</h1>
      <h2>{t('horoscope', { sign: horoscope.sign, text: horoscope.text })}</h2>
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ru')}>Русский</button>
      </div>
    </div>
  );
};

export default App;
