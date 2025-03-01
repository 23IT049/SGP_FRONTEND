import PhilatelicCategory from "./PhilatelicCategory";

export const philatelicCategories = {
  Stamps: ["MintCommemorativeStamps", "MintDefinitiveStamps", "TopMarginalBlock", "BottomMarginalBlock", "FullSheet"],
  Covers: ["FirstDayCoversAffixed", "FirstDayCoversBlank", "FirstDayCoverPack"],
  Brochures: ["InformationBrochureAffixed", "InformationBrochureBlank"],
  Packs: ["AnnualStampPack", "ChildrenSpecialAnnualStampPack", "SpecialCollectorsStampPack"],
  Souvenirs: ["MiniSheet/SouvenirSheet"],
};

function PhilatelicInventory({ formData, setFormData }) {
  return (
    <>
      {Object.entries(philatelicCategories).map(([category, items]) => (
        <PhilatelicCategory
          key={category}
          category={category}
          items={items}
          formData={formData}
          setFormData={setFormData}
        />
      ))}
    </>
  );
}

export default PhilatelicInventory;
