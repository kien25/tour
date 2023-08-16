import mailerQueue from "./queue.consumers";

const sendEmail = async (job: { email: string; link: string }) => {
  await mailerQueue.add(job);
};

export default {
  sendEmail,
};
