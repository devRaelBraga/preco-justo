export function generatePixCode({
    amount,
    description = "",
  }: {
    amount: number;
    description?: string;
  }): string {
    const name = 'Hisrael';
    const city = 'Manaus';
    const key='02039305253';
    const id = generateTxid();
    const PAYLOAD = "000201"; // Payload Format Indicator
    const MERCHANT_CATEGORY = "52040000"; // MCC (Merchant Category Code)
    const CURRENCY = "5303986"; // Moeda (Real)
    const COUNTRY_CODE = "5802BR"; // Código do País (Brasil)
    const CRC_16 = "6304"; // CRC16
  
    function generateTxid(): string {
      return Math.random().toString(36).substring(2, 12).toUpperCase();
    }
  
    if (!key || !amount || !name || !city || !id) {
      throw new Error("Todos os campos são obrigatórios");
    }
  
    const formatText = (text: string) =>
      text.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9 ]/g, "");
  
    const formattedName = formatText(name).substring(0, 25);
    const formattedCity = formatText(city).substring(0, 15);
    const formattedDescription = formatText(description).substring(0, 40);
  
    const getMerchantAccountPayload = () => {
      const keySize = key.length.toString().padStart(2, "0");
      const merchantAccountData = `0014BR.GOV.BCB.PIX01${keySize}${key}`;
      const length = merchantAccountData.length.toString().padStart(2, "0");
      return `26${length}${merchantAccountData}`;
    };
  
    const getTransactionAmountPayload = () => {
      const amountFormatted = amount.toFixed(2);
      const length = amountFormatted.length.toString().padStart(2, "0");
      return `54${length}${amountFormatted}`;
    };
  
    const getMerchantNamePayload = () => {
      const length = formattedName.length.toString().padStart(2, "0");
      return `59${length}${formattedName}`;
    };
  
    const getMerchantCityPayload = () => {
      const length = formattedCity.length.toString().padStart(2, "0");
      return `60${length}${formattedCity}`;
    };
  
    const getAdditionalDataFieldPayload = () => {
      const referenceLabel = `05${id.length.toString().padStart(2, "0")}${id}`;
      let additionalData = referenceLabel;
      
      if (formattedDescription) {
        const descriptionField = `08${formattedDescription.length.toString().padStart(2, "0")}${formattedDescription}`;
        additionalData += descriptionField;
      }
      
      const length = additionalData.length.toString().padStart(2, "0");
      return `62${length}${additionalData}`;
    };
  
    const crcChecksum = (payload: string): string => {
      let result = 0xffff;
      for (let offset = 0; offset < payload.length; offset++) {
        result ^= payload.charCodeAt(offset) << 8;
        for (let bitwise = 0; bitwise < 8; bitwise++) {
          if ((result <<= 1) & 0x10000) result ^= 0x1021;
          result &= 0xffff;
        }
      }
      return result.toString(16).toUpperCase().padStart(4, "0");
    };
  
    const payload = `${PAYLOAD}${getMerchantAccountPayload()}${MERCHANT_CATEGORY}${CURRENCY}${getTransactionAmountPayload()}${COUNTRY_CODE}${getMerchantNamePayload()}${getMerchantCityPayload()}${getAdditionalDataFieldPayload()}${CRC_16}`;
    
    const crc = crcChecksum(payload);
    return `${payload}${crc}`;
  }
  