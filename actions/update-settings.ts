"use server";

import { db } from "@/lib/db";

export const updateSettings = async (data: { 
  name?: string; 
  image?: string; 
  email: string; 
  toggleTwoFactor?: boolean; 
}) => {
  if (!data.email) {
    return { error: "El correo electrónico es obligatorio." };
  }

  try {
    const updates: { name?: string; image?: string; isTwoFactorEnabled?: boolean } = {};

    // Actualizar nombre o imagen si están presentes
    if (data.name) updates.name = data.name;
    if (data.image) updates.image = data.image;

    // Actualizar estado de 2FA si se solicita
    if (data.toggleTwoFactor !== undefined) {
      updates.isTwoFactorEnabled = data.toggleTwoFactor;
    }

    const updatedUser = await db.user.update({
      where: { email: data.email },
      data: updates,
    });

    return { 
      success: "Configuración actualizada correctamente", 
      user: updatedUser 
    };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo actualizar la configuración del usuario." };
  }
};
