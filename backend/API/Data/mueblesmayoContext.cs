using System;
using System.Collections.Generic;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Data
{
  public partial class mueblesmayoContext : DbContext
  {
    public mueblesmayoContext()
    {
    }

    public mueblesmayoContext(DbContextOptions<mueblesmayoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categorias { get; set; } = null!;
    public virtual DbSet<Material> Materiales { get; set; } = null!;
    public virtual DbSet<Producto> Productos { get; set; } = null!;
    public virtual DbSet<Tipo> Tipos { get; set; } = null!;
    public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        string connectionString = configuration.GetConnectionString("DefaultConnection");

        optionsBuilder.UseNpgsql(connectionString);
      }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Categoria>(entity =>
      {
        entity.HasKey(e => e.IdCategoria)
                  .HasName("categorias_pkey");

        entity.ToTable("categorias");

        entity.Property(e => e.IdCategoria).HasColumnName("id_categoria");

        entity.Property(e => e.Nombre).HasColumnName("nombre");
      });

      modelBuilder.Entity<Material>(entity =>
      {
        entity.HasKey(e => e.IdMaterial)
                  .HasName("materiales_pkey");

        entity.ToTable("materiales");

        entity.Property(e => e.IdMaterial).HasColumnName("id_material");

        entity.Property(e => e.Nombre).HasColumnName("nombre");
      });

      modelBuilder.Entity<Producto>(entity =>
      {
        entity.HasKey(e => e.IdProducto)
                  .HasName("productos_pkey1");

        entity.ToTable("productos");

        entity.HasIndex(e => e.IdCategoria, "fki_fk_categoria");

        entity.HasIndex(e => e.IdMaterial, "fki_fk_material");

        entity.HasIndex(e => e.IdTipo, "fki_fk_tipo");

        entity.HasIndex(e => e.IdTipo, "fki_k");

        entity.Property(e => e.IdProducto).HasColumnName("id_producto");

        entity.Property(e => e.Alto).HasColumnName("alto");

        entity.Property(e => e.EnDescuento).HasColumnName("enDescuento");

        entity.Property(e => e.Frente).HasColumnName("frente");

        entity.Property(e => e.IdCategoria).HasColumnName("id_categoria");

        entity.Property(e => e.IdImagen).HasColumnName("id_imagen");

        entity.Property(e => e.IdMaterial).HasColumnName("id_material");

        entity.Property(e => e.IdTipo).HasColumnName("id_tipo");

        entity.Property(e => e.Nombre).HasColumnName("nombre");

        entity.Property(e => e.Profundidad).HasColumnName("profundidad");

        entity.Property(e => e.Stock).HasColumnName("stock");

        entity.Property(e => e.UrlImagen).HasColumnName("url_imagen");

        entity.HasOne(d => d.IdCategoriaNavigation)
                  .WithMany(p => p.Productos)
                  .HasForeignKey(d => d.IdCategoria)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("fk_categoria");

        entity.HasOne(d => d.IdMaterialNavigation)
                  .WithMany(p => p.Productos)
                  .HasForeignKey(d => d.IdMaterial)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("fk_material");

        entity.HasOne(d => d.IdTipoNavigation)
                  .WithMany(p => p.Productos)
                  .HasForeignKey(d => d.IdTipo)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("fk_tipo");
      });

      modelBuilder.Entity<Tipo>(entity =>
      {
        entity.HasKey(e => e.IdTipo)
                  .HasName("tipos_pkey");

        entity.ToTable("tipos");

        entity.Property(e => e.IdTipo).HasColumnName("id_tipo");

        entity.Property(e => e.Nombre).HasColumnName("nombre");
      });

      modelBuilder.Entity<Usuario>(entity =>
      {
        entity.HasKey(e => e.IdUsuario)
                  .HasName("usuarios_pkey");

        entity.ToTable("usuarios");

        entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

        entity.Property(e => e.FechaAlta).HasColumnName("fechaAlta");

        entity.Property(e => e.Nombre).HasColumnName("nombre");

        entity.Property(e => e.Password).HasColumnName("password");

        entity.Property(e => e.Username).HasColumnName("username");
      });

      OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
  }
}
