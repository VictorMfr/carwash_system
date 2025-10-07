import { User } from '@/services/backend/models/associations';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json();

    console.log(email, newPassword);

    if (!email || !newPassword) {
      console.log('Email and new password are required');
      return NextResponse.json(
        { error: 'Email and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      console.log('Password must be at least 6 characters long');
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Update user password
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successfully' 
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
