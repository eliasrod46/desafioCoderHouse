export const desnormalizar = (messages) => {
  const user = new normalizr.schema.Entity("users");
  const mensajes = new normalizr.schema.Entity("mensajes", {
    author: user,
  });
  const chats = new normalizr.schema.Entity("chats", { chats: [mensajes] });

  const denormalizedMensajes = normalizr.denormalize(
    messages.result,
    chats,
    messages.entities
  );

  return denormalizedMensajes;
};
