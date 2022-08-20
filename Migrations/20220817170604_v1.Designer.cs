﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace Template.Migrations
{
    [DbContext(typeof(IspitDbContext))]
    [Migration("20220817170604_v1")]
    partial class v1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Prodavnica", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Mesta")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Prodavnica");
                });

            modelBuilder.Entity("Models.Sastojak", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Sastojci");
                });

            modelBuilder.Entity("Models.Spoj", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Cena")
                        .HasColumnType("int");

                    b.Property<int>("Kolicina")
                        .HasColumnType("int");

                    b.Property<int?>("SpojProdavnicaId")
                        .HasColumnType("int");

                    b.Property<int?>("SpojSastojakId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SpojProdavnicaId");

                    b.HasIndex("SpojSastojakId");

                    b.ToTable("Spojevi");
                });

            modelBuilder.Entity("Models.Spoj", b =>
                {
                    b.HasOne("Models.Prodavnica", "SpojProdavnica")
                        .WithMany("SpojProdavnica")
                        .HasForeignKey("SpojProdavnicaId");

                    b.HasOne("Models.Sastojak", "SpojSastojak")
                        .WithMany("SpojSastojak")
                        .HasForeignKey("SpojSastojakId");

                    b.Navigation("SpojProdavnica");

                    b.Navigation("SpojSastojak");
                });

            modelBuilder.Entity("Models.Prodavnica", b =>
                {
                    b.Navigation("SpojProdavnica");
                });

            modelBuilder.Entity("Models.Sastojak", b =>
                {
                    b.Navigation("SpojSastojak");
                });
#pragma warning restore 612, 618
        }
    }
}