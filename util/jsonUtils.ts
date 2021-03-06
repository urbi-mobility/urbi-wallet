export const serialize = (obj: any) => {
  let serialized: any = {};
  Object.keys(obj)
    .sort()
    .forEach(k => {
      const v = obj[k];
      if (v !== null && v !== undefined) {
        if (!Array.isArray(v) && typeof v === "object") {
          serialized[k] = serialize(v);
        } else {
          serialized[k] = v;
        }
      }
    });
  return serialized;
};

export const serializeToJson = (obj: any) => JSON.stringify(serialize(obj));
