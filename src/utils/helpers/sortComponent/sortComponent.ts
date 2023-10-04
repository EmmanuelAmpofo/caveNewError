interface ComponentDetail {
    componentId: number;
    componentName: string;
    description: string;
    price: number;
    primaryImage: string;
    secondaryImage: string;
  }
  
  interface Component {
    componentType: string;
    componentSubType: string;
    componentsDetail: ComponentDetail[];
  }
  
  export function groupDataByComponentType(
    data: Component[]
  ): Record<string, Component[]> {
    const groupedData: Record<string, Component[]> = {};
  
    data?.forEach((item) => {
      const { componentType } = item;
      if (!groupedData[componentType]) {
        groupedData[componentType] = [];
      }
      groupedData[componentType].push(item);
    });
  
    return groupedData;
  }