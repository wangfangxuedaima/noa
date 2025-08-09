import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../modules/roles/entities/role.entity';
import { User } from '../../modules/users/entities/user.entity';

export async function initializeDatabase(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);
  const userRepository = dataSource.getRepository(User);

  // 创建默认角色
  const adminRole = await roleRepository.findOne({ where: { name: 'admin' } });
  if (!adminRole) {
    const newAdminRole = roleRepository.create({
      name: 'admin',
      description: '管理员角色',
      permissions: ['*'],
    });
    await roleRepository.save(newAdminRole);
  }

  const userRole = await roleRepository.findOne({ where: { name: 'user' } });
  if (!userRole) {
    const newUserRole = roleRepository.create({
      name: 'user',
      description: '普通用户角色',
      permissions: ['read'],
    });
    await roleRepository.save(newUserRole);
  }

  // 创建默认管理员用户
  const adminUser = await userRepository.findOne({ where: { username: 'admin' } });
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const savedAdminRole = await roleRepository.findOne({ where: { name: 'admin' } });
    
    const newAdminUser = userRepository.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      nickname: '系统管理员',
      roles: [savedAdminRole],
    });
    await userRepository.save(newAdminUser);
    console.log('默认管理员用户已创建: admin/admin123');
  }
}